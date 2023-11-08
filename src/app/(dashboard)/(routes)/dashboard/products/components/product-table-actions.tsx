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
import { type Product } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { deleteProduct } from "../manage-product/actions";

interface ProductTableActionsProps {
  product: Product;
}

export function ProductTableActions({ product }: ProductTableActionsProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCopy() {
    void navigator.clipboard.writeText(product.id);
    toast({
      title: "Product copied",
      description: "Porduct ID copied to clipboard",
    });
  }

  return (
    <DeleteModal
      isOpen={isModalOpen}
      setIsModalOpen={() => setIsModalOpen((prevOpen) => !prevOpen)}
      entityName={product.name}
      entityId={product.id}
      formAction={deleteProduct}
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
              href={`${ROUTES.DASHBOARD.MANAGE_PRODUCT}?productId=${product.id}`}
            >
              Manage product
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopy}>
            Copy product ID
          </DropdownMenuItem>
          <DialogTrigger className="w-full">
            <DropdownMenuItem className="text-primary">
              Delete product
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </DeleteModal>
  );
}
