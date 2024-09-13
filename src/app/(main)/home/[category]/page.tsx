import { Metadata } from "next";
import CategoryFeed from "./category-feed";

export function generateMetadata({
  params: { category },
}: {
  params: { category: string };
}): Metadata {
  return {
    title: `${category}`,
  };
}

export default function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  return (
    <main className="flex w-full flex-col">
      <CategoryFeed category={category} />
    </main>
  );
}
