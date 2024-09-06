"use client";

import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SearchField() {
  const router = useRouter();
  const pathName = usePathname();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="flex flex-row items-center">
        <Button variant={"ghost"} className="flex size-fit">
          <Link href="/search" className="flex size-fit">
            {pathName === "/search" ? (
              <RiSearchFill className="size-6 flex-shrink-0" />
            ) : (
              <RiSearchLine className="size-6 flex-shrink-0" />
            )}
          </Link>
        </Button>
        <Input name="q" placeholder="Search" className="pl-2" />
      </div>
    </form>
  );
}
