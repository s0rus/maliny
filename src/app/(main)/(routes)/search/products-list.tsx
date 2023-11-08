import { type FullProduct } from "@/app/api/products/get-products";
import { ProductCard } from "@/components/product-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ProductsList({ products }: { products: FullProduct[] | [] }) {
  if (!products?.length) {
    return (
      <div>
        <Alert>
          <AlertTitle>Nothing was found!</AlertTitle>
          <AlertDescription>Try searching for something else.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
