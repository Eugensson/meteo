import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/search-dialog";

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
