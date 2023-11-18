import { getProductById } from "@/app/api/products/get-product-by-id";
import { ImageBrowser } from "@/components/image-browser";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/typography/typography-h3";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { Suspense } from "react";
import { AddToCartDetails } from "./components/add-to-cart-details";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { RecentlyWatched } from "./components/recently-watched";
import { SpecPreview } from "./components/spec-preview";

interface CertainProductPageProps {
  params: {
    productId: string;
  };
}

export default async function CertainProductPage({
  params,
}: CertainProductPageProps) {
  const product = await getProductById(params.productId);
  const productImages = product.images.map((image) => ({
    fileKey: image.image_key,
    fileUrl: image.image_url,
  }));
  const specPreview = product.specifications.slice(0, 4);

  return (
    <Suspense fallback={"Loading..."}>
      <div className="flex flex-col gap-12">
        <div className="flex flex-row justify-between gap-32 pt-16">
          <div>
            <ImageBrowser images={productImages} />
          </div>
          <div className="flex flex-1 flex-row justify-between gap-4 pt-16">
            <div className="flex flex-1 flex-col gap-4">
              <div>
                <TypographyH3>{product.name}</TypographyH3>
                <Badge variant="secondary">{product.category.name}</Badge>
              </div>
              <Separator />
              <div className="flex flex-row justify-between">
                <SpecPreview specList={specPreview} />
              </div>
            </div>
            <AddToCartDetails
              productId={product.id}
              price={product.price}
              stock={product.stock}
            />
          </div>
        </div>
        <div className="prose prose-invert">
          <h2 className="text-4xl">{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <Separator />
        <div id="specification">
          <TypographyH3>Specification:</TypographyH3>
          <Table className="mt-4">
            <TableBody>
              {specPreview.map((spec, index) => (
                <TableRow
                  key={spec.specification.id}
                  className={cn(index % 2 !== 1 && "bg-muted/20")}
                >
                  <TableCell className="pl-24">
                    <TypographyMuted className="text-base">
                      {spec.specification.name}
                    </TypographyMuted>
                  </TableCell>
                  <TableCell className="text-left">
                    {spec.value} {spec.specification.unit ?? null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <RecentlyWatched
          product={{
            id: product.id,
            name: product.name,
            imageUrl: product.images[0].image_url,
            price: product.price,
            categoryName: product.category.name,
          }}
        />
      </div>
    </Suspense>
  );
}
