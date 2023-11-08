"use client";

import { ROUTES } from "@/app/api/routes";
import { type Specification } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";
import { SpecificationTableActions } from "./specification-table-actions";

export const specificationColumns: ColumnDef<Specification>[] = [
  {
    accessorKey: "id",
    header: "Parameter ID",
    cell: ({ row }) => {
      const specId: string = row.getValue("id");

      return (
        <Link
          href={`${ROUTES.DASHBOARD.MANAGE_SPECIFICATIONS}?specId=${specId}`}
          className="hover:underline"
        >
          {specId}
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Parameter name",
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const unit: string = row.getValue("unit");

      return unit || "N/A";
    },
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
      return <SpecificationTableActions specification={row.original} />;
    },
  },
];
