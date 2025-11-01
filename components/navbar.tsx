import { Logo } from "@/components/logo";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";

export const Navbar = () => {
  return (
    <nav className="py-4 flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-x-4">
        <SearchDialog />
        <ThemeToggle />
      </div>
    </nav>
  );
};
