"use server";

import { ROUTES } from "@/app/api/routes";
import { db } from "@/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int(),
});

const UpdateQuantitySchema = z.object({
  entryId: z.string().min(1),
  quantity: z.coerce.number().int(),
});

const AddCartItem = CartSchema;
const RemoveCartItem = UpdateQuantitySchema.pick({ entryId: true });

export type CartSchema = z.infer<typeof CartSchema>;

export async function addItemToCart(_prevState: unknown, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = AddCartItem.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to add item to cart.",
    };
  }

  const { productId, quantity } = validatedFields.data;
  const { userId } = auth();

  try {
    if (!userId) {
      return {
        errors: {
          userId: "Missing userId field",
        },
        message: "Failed to add item to cart.",
      };
    }

    await db.cart.upsert({
      where: {
        user_id: userId,
      },
      create: {
        product: {
          connect: {
            id: productId,
          },
        },
        user_id: userId,
        entries: {
          create: {
            quantity,
            product_id: productId,
          },
        },
      },
      update: {
        entries: {
          upsert: {
            where: {
              product_id: productId,
            },
            create: {
              quantity,
              product_id: productId,
            },
            update: {
              quantity,
              product_id: productId,
            },
          },
        },
      },
    });

    revalidatePath("/");

    return {
      message: "Product added to cart",
    };
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return {
      errors: {
        dbError: error.message,
      },
      message: "Database Error: Failed to add item to cart.",
    };
  }
}

export async function emptyCart() {
  const { userId } = auth();

  try {
    if (!userId) {
      return {
        errors: {
          userId: "Missing userId field",
        },
        message: "Failed to empty the cart.",
      };
    }

    await db.cartEntry.deleteMany({
      where: {
        cart: {
          every: {
            user_id: userId,
          },
        },
      },
    });

    revalidatePath("/");

    return {
      message: "Cart emptied.",
    };
  } catch (err) {
    const error = err as Error;
    return {
      errors: {
        dbError: error.message,
      },
      message: "Database Error: Failed to empty the cart.",
    };
  }
}

export async function removeItemFromCart(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = RemoveCartItem.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to remove item.",
    };
  }

  const { entryId } = validatedFields.data;

  try {
    await db.cartEntry.delete({
      where: {
        id: entryId,
      },
    });

    revalidatePath(ROUTES.CART);

    return {
      message: "Item removed from the cart",
    };
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return {
      errors: {
        dbError: error.message,
      },
      message: "Database Error: Failed to remove item.",
    };
  }
}

export async function updateItemQuantity(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = UpdateQuantitySchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update item quantity.",
    };
  }

  const { entryId, quantity } = validatedFields.data;

  try {
    await db.cartEntry.update({
      where: {
        id: entryId,
      },
      data: {
        quantity,
      },
    });

    revalidatePath(ROUTES.CART);

    return {
      message: "Item quantity updated.",
    };
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return {
      errors: {
        dbError: error.message,
      },
      message: "Database Error: Failed to update item quantity.",
    };
  }
}
