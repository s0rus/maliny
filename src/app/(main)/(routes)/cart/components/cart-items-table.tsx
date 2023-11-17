import { type FullCartEntry } from "@/app/api/carts/get-cart";
import { ROUTES } from "@/app/api/routes";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { priceFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { QuantitySelectForm } from "./quantity-select-form";
import { RemoveItemForm } from "./remove-item-form";

interface CartItemsTableProps {
  items: FullCartEntry[];
}

export function CartItemsTable({ items }: CartItemsTableProps) {
  return (
    <Table>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <Image
                src={item.product.images[0].image_url}
                alt={`${item.product.name}'s image`}
                width={64}
                height={64}
              />
            </TableCell>
            <TableCell>
              <Button asChild variant="link">
                <Link href={`${ROUTES.PRODUCTS}/${item.product_id}`}>
                  {item.product.name}
                </Link>
              </Button>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex flex-row items-center justify-end gap-4">
                <p>{priceFormatter().format(item.product.price)}</p>
                <QuantitySelectForm
                  entryId={item.id}
                  initialQuantity={item.quantity}
                />
                <RemoveItemForm entryId={item.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
