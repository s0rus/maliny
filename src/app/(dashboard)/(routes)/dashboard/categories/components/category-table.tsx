import { getCategories } from "@/app/api/categories/get-categories";
import { DataTable } from "@/components/ui/data-table";
import { categoryColumns } from "./category-columns";

export async function CategoryTable() {
  const categories = await getCategories();

  return <DataTable columns={categoryColumns} data={categories} />;
}
