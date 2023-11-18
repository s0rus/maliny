"use client";

import { type FullProduct } from "@/app/api/products/get-products";
import { ROUTES } from "@/app/api/routes";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { priceFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type RecentlyWatchedProduct = Pick<FullProduct, "id" | "name" | "price"> & {
  imageUrl: string;
  categoryName: string;
};

interface RecentlyWatchedProps {
  product: RecentlyWatchedProduct | null;
}

const RECENTLY_WATCHED_KEY = "mln_rw" as const;

export function RecentlyWatched({ product }: RecentlyWatchedProps) {
  const [products, setProducts] = useState<RecentlyWatchedProduct[] | []>([]);

  useEffect(() => {
    setProducts(getProductsArray());
  }, []);

  const getProductsArray = () => {
    const storedProducts = localStorage.getItem(RECENTLY_WATCHED_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts) as RecentlyWatchedProduct[];
    }
    return [];
  };

  const isItemSaved = useCallback(
    (itemId: string) => {
      return products.some((obj) => obj.id === itemId);
    },
    [products],
  );

  const saveProductsArray = (data: RecentlyWatchedProduct[]) => {
    localStorage.setItem(RECENTLY_WATCHED_KEY, JSON.stringify(data));
  };

  const handleRecentlyWatchedChange = useCallback(() => {
    if (!product) {
      return;
    }

    if (!isItemSaved(product.id)) {
      const newItemsArray = [product, ...products].slice(-10);

      saveProductsArray(newItemsArray);
    }
  }, [product, products, isItemSaved]);

  useEffect(() => {
    handleRecentlyWatchedChange();
  }, [product, products, handleRecentlyWatchedChange]);

  return (
    <div className="flex flex-col gap-2">
      <TypographyMuted className="text-lg">Recently viewed</TypographyMuted>
      <div className="flex flex-row gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`${ROUTES.PRODUCTS}/${product.id}`}>
            <Card>
              <CardHeader className="p-0">
                <CardTitle className="pt-4">
                  <div className="flex cursor-pointer items-center justify-center overflow-hidden p-2">
                    <Image
                      alt={`${product.name}'s image`}
                      src={product.imageUrl}
                      width={100}
                      height={100}
                      className="h-auto"
                    />
                  </div>
                </CardTitle>
                <CardDescription className="px-8 text-lg font-bold text-primary">
                  {product.name}
                </CardDescription>
              </CardHeader>
              <CardFooter className="px-8 text-base font-semibold">
                <p>{priceFormatter().format(product.price)}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
