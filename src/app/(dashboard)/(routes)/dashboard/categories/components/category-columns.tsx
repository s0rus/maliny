"use client";

import { ROUTES } from "@/app/api/routes";
import { type Category } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import { CategoryTableActions } from "./category-table-actions";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Category ID",
    cell: ({ row }) => {
      const categoryId: string = row.getValue("id");

      return (
        <Link
          href={`${ROUTES.DASHBOARD.MANAGE_CATEGORY}?categoryId=${categoryId}`}
          className="hover:underline"
        >
          {categoryId}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Category name",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("created_at");

      return <>{dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss")}</>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ row }) => {
      const updatedAt: Date = row.getValue("updated_at");

      return <>{dayjs(updatedAt).format("DD/MM/YYYY HH:mm:ss")}</>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

      return <CategoryTableActions category={category} />;
    },
  },
];
