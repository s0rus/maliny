import { Footer } from "@/components/footer";
import MainNavbar from "@/components/main-navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavbar />
      <div className="pt-16" />
      <div className="flex-1">{props.children}</div>
      <Footer />
    </div>
  );
}
