export default function HomePage() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="col-span-2 flex h-36 w-full items-center justify-center rounded-lg border border-primary bg-gradient-to-r from-primary to-transparent px-16 py-24">
        <h2 className="text-2xl font-bold md:text-4xl">
          Welcome to maliny, this is just a dummy page of a pseudo-shop to test
          out react and next.js server-actions thingies.
        </h2>
      </div>
      <div className="col-span-1 flex h-36 w-full items-center justify-center rounded-lg border border-primary bg-gradient-to-r from-primary to-transparent px-16 py-24">
        <p className="text-lg font-bold">
          Head over to /dashboard while logged in to play around with products
        </p>
      </div>
      <div className="col-span-1 flex h-36 w-full items-center justify-center rounded-lg border border-primary bg-gradient-to-r from-primary to-transparent px-16 py-24">
        <p className="text-lg font-bold">
          Search for added product to play around with the cart etc.
        </p>
      </div>
    </div>
  );
}
