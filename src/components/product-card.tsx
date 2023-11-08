import { type FullProduct } from "@/app/api/products/get-products";
import { ROUTES } from "@/app/api/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { priceFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TypographyMuted } from "./ui/typography/typography-muted";

interface ProductCardProps {
  product: FullProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const specPreview = product.specifications.slice(0, 4);

  return (
    <Link href={`${ROUTES.PRODUCTS}/${product.id}`}>
      <Card>
        <CardHeader className="p-0">
          <CardTitle className="pt-4">
            <div className="flex max-h-[200px] min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden object-contain object-center p-2">
              <Image
                alt={`${product.name}'s image`}
                src={product.images[0].image_url}
                width={100}
                height={100}
              />
            </div>
          </CardTitle>
          <CardDescription className="px-8 text-lg font-bold text-primary">
            {product.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <ul className="flex flex-col">
            {specPreview.map((spec) => (
              <li
                key={spec.specification.id}
                className="inline-flex items-baseline gap-2"
              >
                <TypographyMuted className="text-xs">
                  {spec.specification.name}:
                </TypographyMuted>
                <span className="text-sm">
                  {spec.value} {spec.specification.unit ?? null}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="px-8 text-base font-semibold">
          <p>{priceFormatter().format(product.price)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
