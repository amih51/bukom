"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SearchField() {
  const router = useRouter();

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
        <Link href="/search" className="ml-3 flex size-fit">
          <RiSearchLine className="size-6 flex-shrink-0" />
        </Link>
        <Input name="q" placeholder="Search" className="pl-2" />
      </div>
    </form>
  );
}
