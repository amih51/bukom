import SearchField from "@/components/search-field";
import { Metadata } from "next";
import SearchResults from "./search-result";

export function generateMetadata({
  searchParams: { q },
}: {
  searchParams: { q: string };
}): Metadata {
  return {
    title: `Search results for "${q}"`,
  };
}

export default async function Page({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  return (
    <main className="flex w-full flex-col">
      <div className="mb-2 mt-6 rounded-xl bg-secondary">
        <SearchField />
      </div>
      <div className="rounded-2xl">
        <h1 className="line-clamp-2 break-all text-xl font-bold">
          Search results for &quot;{q}&quot;
        </h1>
      </div>
      <SearchResults query={q} />
    </main>
  );
}
