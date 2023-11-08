import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(1),
  stock: z.coerce.number().int(),
  categoryId: z.string().min(1),
  specifications: z.array(
    z.object({
      specId: z.string().min(1),
      value: z.string().min(1),
      unit: z.string().nullable(),
    }),
  ),
  images: z
    .array(
      z.object({
        fileKey: z.string(),
        fileUrl: z.string().url(),
      }),
    )
    .min(1),
});

export type ProductSchema = z.infer<typeof ProductSchema>;
