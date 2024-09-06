import { Metadata } from "next";

export function generateMetadata({
  searchParams: { q },
}: {
  searchParams: { q: string };
}): Metadata {
  return {
    title: `Search results for "${q}"`,
  };
}

export default function Page({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  return (
    <main className="flex items-center justify-center">
      Search results for &quot;{q}&quot;
    </main>
  );
}
