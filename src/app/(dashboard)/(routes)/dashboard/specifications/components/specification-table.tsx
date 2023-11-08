import { getSpecifications } from "@/app/api/specifications/get-specifications";
import { DataTable } from "@/components/ui/data-table";
import { specificationColumns } from "./specification-columns";

export async function SpecificationTable() {
  const specifications = await getSpecifications();

  return <DataTable columns={specificationColumns} data={specifications} />;
}
