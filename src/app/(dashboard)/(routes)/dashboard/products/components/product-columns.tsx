"use client";

import { type FullProduct } from "@/app/api/products/get-products";
import { ROUTES } from "@/app/api/routes";
import { ImageBrowser } from "@/components/image-browser";
import { priceFormatter } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ProductTableActions } from "./product-table-actions";

export const productColumns: ColumnDef<FullProduct>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id");

      return (
        <Link
          href={`${ROUTES.DASHBOARD.MANAGE_PRODUCT}?productId=${id}`}
          className="hover:underline"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formattedPrice = priceFormatter().format(price);

      return <div className="text-right">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("stock")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "images",
    header: "Images",
    enableHiding: false,
    cell: ({ row }) => {
      const images = row.original.images;

      return (
        <ImageBrowser
          images={images.slice(0, 2).map((image) => ({
            fileKey: image.image_key,
            fileUrl: image.image_url,
          }))}
          withoutBigPreview
        />
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return <ProductTableActions product={product} />;
    },
  },
];
