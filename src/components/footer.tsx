import { ThemeSwitch } from "./ui/theme-switch";

export function Footer() {
  return (
    <footer className="flex items-center justify-between py-6 text-muted">
      <div>maliny &copy; 2023</div>
      <ThemeSwitch />
    </footer>
  );
}
