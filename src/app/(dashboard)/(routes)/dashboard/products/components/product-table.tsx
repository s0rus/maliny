import { getProducts } from "@/app/api/products/get-products";
import { DataTable } from "@/components/ui/data-table";
import { productColumns } from "./product-columns";

export async function ProductTable() {
  const products = await getProducts();

  return <DataTable columns={productColumns} data={products} />;
}
