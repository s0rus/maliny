"use server";

import { ROUTES } from "@/app/api/routes";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    name?: string[];
    unit?: string[];
  };
  message?: string | null;
};

const SpecificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  unit: z.string().optional(),
});

const CreateSpecification = SpecificationSchema.omit({ id: true });
const UpdateSpecification = SpecificationSchema;
const DeleteSpecification = SpecificationSchema.pick({ id: true });

export type SpecificationSchema = z.infer<typeof SpecificationSchema>;

export async function createSpecification(
  _prevState: State,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = CreateSpecification.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create specification.",
    };
  }

  const { name, unit } = validatedFields.data;

  try {
    await db.specification.create({
      data: {
        name,
        unit,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to create specification.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.SPECIFICATIONS);
  revalidatePath(ROUTES.DASHBOARD.MANAGE_PRODUCT);
  redirect(ROUTES.DASHBOARD.SPECIFICATIONS);
}

export async function updateSpecification(
  _prevState: State,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = UpdateSpecification.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to update specification.",
    };
  }

  const { id, name, unit } = validatedFields.data;

  try {
    await db.specification.update({
      where: {
        id,
      },
      data: {
        name,
        unit,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to update specification.",
    };
  }
  revalidatePath(ROUTES.DASHBOARD.SPECIFICATIONS);
  revalidatePath(ROUTES.DASHBOARD.MANAGE_PRODUCT);
  redirect(ROUTES.DASHBOARD.SPECIFICATIONS);
}

export async function deleteSpecification(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = DeleteSpecification.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to delete specification.",
    };
  }

  const { id } = validatedFields.data;

  try {
    await db.specification.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to delete specification.",
    };
  }

  revalidatePath(ROUTES.DASHBOARD.SPECIFICATIONS);
  revalidatePath(ROUTES.DASHBOARD.MANAGE_PRODUCT);
  redirect(ROUTES.DASHBOARD.SPECIFICATIONS);
}
