import { Footer } from "@/components/footer";
import MainNavbar from "@/components/main-navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <MainNavbar />
      <div className="pt-16" />
      {props.children}
      <Footer />
    </>
  );
}
