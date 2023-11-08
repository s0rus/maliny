import { getProductByName } from "@/app/api/products/get-product-by-name";
import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/typography/typography-h3";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { redirect } from "next/navigation";
import { ProductsList } from "./products-list";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  if (!searchParams?.q) {
    redirect("/");
  }

  const products = await getProductByName(searchParams.q);

  const productsCount = products?.length ?? 0;

  const MATCHES_STRING = `(${productsCount} match${
    productsCount > 1 || productsCount === 0 ? "es" : ""
  })`;

  return (
    <>
      <div className="flex flex-col">
        <div className="inline-flex items-baseline gap-4">
          <TypographyH3 className="text-4xl">
            &quot;{searchParams.q}&quot;
          </TypographyH3>
          <TypographyMuted className="text-lg">
            {MATCHES_STRING}
          </TypographyMuted>
        </div>
        <Separator className="my-4" />
        <ProductsList products={products} />
      </div>
    </>
  );
}
