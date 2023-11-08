"use client";

import { ROUTES } from "@/app/api/routes";
import { DeleteModal } from "@/components/delete-modal";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/use-toast";
import { type Category } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { deleteCategory } from "../manage-category/actions";

interface CategoryTableActionsProps {
  category: Category;
}

export function CategoryTableActions({ category }: CategoryTableActionsProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCopy() {
    void navigator.clipboard.writeText(category.id);
    toast({
      title: "Category copied",
      description: "Category ID copied to clipboard",
    });
  }

  return (
    <DeleteModal
      isOpen={isModalOpen}
      setIsModalOpen={() => setIsModalOpen((prevOpen) => !prevOpen)}
      entityName={category.name}
      entityId={category.id}
      formAction={deleteCategory}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icon.more className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`${ROUTES.DASHBOARD.MANAGE_CATEGORY}?categoryId=${category.id}`}
            >
              Manage category
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopy}>
            Copy category ID
          </DropdownMenuItem>
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="text-primary">
              Delete category
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </DeleteModal>
  );
}
