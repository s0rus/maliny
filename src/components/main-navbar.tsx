import Link from "next/link";
import AuthButton from "./auth-button";
import CartButton from "./cart-button";
import { Search } from "./search";

const MainNavbar = () => {
  return (
    <nav className="flex items-center justify-between gap-16 py-4">
      <div>
        <Link href="/">
          <span className="text-3xl font-bold">Maliny</span>
        </Link>
      </div>
      <Search />
      <div className="flex items-center gap-4">
        <CartButton />
        <AuthButton />
      </div>
    </nav>
  );
};

export default MainNavbar;
