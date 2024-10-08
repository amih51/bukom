"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { RiSearchLine } from "react-icons/ri";

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) {
      router.push("/home");
      return;
    }

    router.push(`/home/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="flex flex-row items-center">
        <div className="ml-3 flex size-fit">
          <RiSearchLine className="size-6 flex-shrink-0" />
        </div>
        <Input name="q" placeholder="Search" className="pl-2" />
      </div>
    </form>
  );
}
