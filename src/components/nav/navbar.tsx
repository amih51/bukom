"use client";

import Link from "next/link";
import ProfileButton from "./profile-btn";
import SearchField from "../search-field";
import Logo from "../logo";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-14 flex-row items-center justify-between border-b-2 bg-background px-6 lg:hidden">
      <div className="flex h-full w-28 flex-wrap items-center lg:w-[calc(20%+4rem)]">
        <Link aria-label="Logo" href="/" className="text-2xl font-bold">
          <div className="w-full">
            <Logo />
          </div>
        </Link>
      </div>
      <div className="hidden size-full items-center sm:flex">
        {pathname != "/search" && (
          <div className="w-full">
            <SearchField />
          </div>
        )}
      </div>
      <div className="flex h-full items-center sm:hidden">
        <ProfileButton />
      </div>
    </header>
  );
}
