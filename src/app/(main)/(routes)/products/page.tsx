import { getProducts } from "@/app/api/products/get-products";
import { ROUTES } from "@/app/api/routes";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      {products.map((product) => (
        <Link key={product.id} href={`${ROUTES.PRODUCTS}/${product.id}`}>
          {product.name}
        </Link>
      ))}
    </>
  );
}
