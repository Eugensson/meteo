import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-start gap-2">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />
      <span className="hidden md:block text-2xl font-bold uppercase tracking-wider">
        Meteo
      </span>
    </Link>
  );
};
