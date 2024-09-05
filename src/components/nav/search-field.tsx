"use client";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { RiSearchLine } from "react-icons/ri";

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
        <RiSearchLine className="mr-2 size-6" />
        <Input name="q" placeholder="Search" className="pe-10" />
      </div>
    </form>
  );
}
