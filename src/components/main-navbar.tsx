import Link from "next/link";
import AuthButton from "./auth-button";
import { Search } from "./search";
import { ThemeSwitch } from "./ui/theme-switch";

const MainNavbar = () => {
  return (
    <nav className="flex items-center justify-between gap-16 py-4">
      <div>
        <Link href="/">
          <span className="text-3xl font-bold">Maliny</span>
        </Link>
      </div>
      <div className="flex-1">
        <Search />
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <AuthButton />
      </div>
    </nav>
  );
};

export default MainNavbar;
