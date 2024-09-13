"use client";

import Link from "next/link";
import ProfileButton from "./profile-btn";
import SearchField from "../search-field";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-12 flex-row items-center justify-between border-b-2 bg-background px-6 lg:hidden">
      <div className="flex h-full w-28 flex-wrap items-center lg:w-[calc(20%+4rem)]">
        <Link href="/" className="text-2xl font-bold">
          {theme === "dark" ? (
            <Image
              src={"/HMIFess-white-02.png"}
              alt={"HMIFess logo dark"}
              width={192}
              height={192}
            />
          ) : theme === "light" ? (
            <Image
              src={"/HMIFess-02.png"}
              alt={"HMIFess logo"}
              width={192}
              height={192}
            />
          ) : (
            <Image
              src={"/HMIFess-01.png"}
              alt={"HMIFess logo"}
              width={192}
              height={192}
            />
          )}
        </Link>
      </div>
      <div className="hidden size-full items-center sm:flex">
        <div className="w-full">
          <SearchField />
        </div>
      </div>
      <div className="flex h-full items-center sm:hidden">
        <ProfileButton />
      </div>
    </header>
  );
}
