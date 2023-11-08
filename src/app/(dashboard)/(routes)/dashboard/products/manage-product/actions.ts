"use server";

import { ROUTES } from "@/app/api/routes";
import { deleteImagesFromUT } from "@/app/api/uploadthing/delete-images";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ProductSchema } from "./schema";

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

const CreateProduct = ProductSchema.omit({ id: true });
const UpdateProduct = ProductSchema;
const DeleteProduct = ProductSchema.pick({ id: true });

export async function createProduct(_prevState: State, formData: FormData) {
  const validatedFields = CreateProduct.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create product.",
    };
  }

  const {
    name,
    description,
    price,
    stock,
    specifications,
    images,
    categoryId,
  } = validatedFields.data;

  try {
    await db.product.create({
      data: {
        name,
        description,
        price,
        stock,
        specifications: {
          createMany: {
            data: specifications.map((spec) => ({
              spec_id: spec.specId,
              value: spec.value,
            })),
          },
        },
        images: {
          createMany: {
            data: images.map((image) => ({
              image_key: image.fileKey,
              image_url: image.fileUrl,
            })),
          },
        },
        category_id: categoryId,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to create product.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.PRODUCTS);
  redirect(ROUTES.DASHBOARD.PRODUCTS);
}

export async function updateProduct(_prevState: State, formData: FormData) {
  const validatedFields = UpdateProduct.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update product.",
    };
  }

  const {
    id,
    name,
    description,
    price,
    stock,
    specifications,
    images,
    categoryId,
  } = validatedFields.data;

  try {
    const currentProduct = await db.product.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        images: true,
        specifications: {
          include: {
            specification: true,
          },
        },
      },
    });

    const currentSpecs = new Set(
      currentProduct.specifications.map((spec) => spec.spec_id),
    );
    const newSpecs = new Set(specifications.map((spec) => spec.specId));

    const specsToAdd = specifications.filter(
      (spec) => !currentSpecs.has(spec.specId),
    );

    const specsToUpdate = specifications.filter((spec) =>
      currentSpecs.has(spec.specId),
    );

    const specsToDelete = currentProduct.specifications.filter(
      (spec) => !newSpecs.has(spec.specification.id),
    );

    const currentImages = new Set(
      currentProduct.images.map((image) => image.image_key),
    );
    const newImages = new Set(images.map((image) => image.fileKey));

    const imagesToAdd = images.filter(
      (image) => !currentImages.has(image.fileKey),
    );

    const imagesToDelete = currentProduct.images.filter(
      (image) => !newImages.has(image.image_key),
    );

    await db.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          price,
          stock,
          specifications: {
            createMany: {
              data: specsToAdd.map((spec) => ({
                spec_id: spec.specId,
                value: spec.value,
              })),
              skipDuplicates: true,
            },
            updateMany: specsToUpdate.map((spec) => ({
              data: {
                spec_id: spec.specId,
                value: spec.value,
              },
              where: {
                spec_id: spec.specId,
              },
            })),
            deleteMany: {
              spec_id: {
                in: specsToDelete.map((spec) => spec.specification.id),
              },
            },
          },
          images: {
            createMany: {
              data: imagesToAdd.map((image) => ({
                image_key: image.fileKey,
                image_url: image.fileUrl,
              })),
              skipDuplicates: true,
            },
            deleteMany: {
              image_key: {
                in: imagesToDelete.map((image) => image.image_key),
              },
            },
          },
          category_id: categoryId,
        },
      });

      await deleteImagesFromUT(imagesToDelete.map((image) => image.image_key));
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to update product.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.PRODUCTS);
  redirect(ROUTES.DASHBOARD.PRODUCTS);
}

export async function deleteProduct(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = DeleteProduct.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to delete product.",
    };
  }

  const { id } = validatedFields.data;

  try {
    await db.$transaction(async (tx) => {
      const removedProduct = await tx.product.delete({
        where: {
          id,
        },
        include: {
          images: true,
        },
      });

      await deleteImagesFromUT(
        removedProduct.images.map((image) => image.image_key),
      );
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to delete product.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.PRODUCTS);
  redirect(ROUTES.DASHBOARD.PRODUCTS);
}
