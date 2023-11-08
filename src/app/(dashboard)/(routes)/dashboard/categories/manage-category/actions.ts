"use server";

import { ROUTES } from "@/app/api/routes";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
});

const CreateCategory = CategorySchema.omit({ id: true });
const UpdateCategory = CategorySchema;
const DeleteCategory = CategorySchema.omit({ name: true });

export type CategorySchema = z.infer<typeof CategorySchema>;

export async function createCategory(_prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = CreateCategory.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create category.",
    };
  }

  const { name } = validatedFields.data;

  try {
    await db.category.create({
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to create category.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.CATEGORIES);
  redirect(ROUTES.DASHBOARD.CATEGORIES);
}

export async function updateCategory(_prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = UpdateCategory.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update category.",
    };
  }

  const { id, name } = validatedFields.data;

  try {
    await db.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to update category.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.CATEGORIES);
  redirect(ROUTES.DASHBOARD.CATEGORIES);
}

export async function deleteCategory(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = DeleteCategory.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to delete category.",
    };
  }

  const { id } = validatedFields.data;

  try {
    await db.category.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to delete category.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.CATEGORIES);
  redirect(ROUTES.DASHBOARD.CATEGORIES);
}
