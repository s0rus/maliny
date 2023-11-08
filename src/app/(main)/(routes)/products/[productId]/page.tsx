import { getProductById } from "@/app/api/products/get-product-by-id";
import { ImageBrowser } from "@/components/image-browser";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/typography/typography-h3";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { Suspense } from "react";

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
      <div className="flex flex-row justify-between gap-32 pt-16">
        <div>
          <ImageBrowser images={productImages} />
        </div>
        <div className="flex-1 pt-16">
          <div className="flex flex-col gap-4">
            <div>
              <TypographyH3>{product.name}</TypographyH3>
              <Badge variant="secondary">{product.category.name}</Badge>
            </div>
            <Separator />
            <div className="flex flex-row justify-between">
              <div>
                <ul className="flex flex-col">
                  {specPreview.map((spec) => (
                    <li
                      key={spec.specification.id}
                      className="inline-flex items-baseline gap-2"
                    >
                      <TypographyMuted>
                        {spec.specification.name}:
                      </TypographyMuted>
                      {spec.value} {spec.specification.unit ?? null}
                    </li>
                  ))}
                </ul>
              </div>
              <div>xDDDD</div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
