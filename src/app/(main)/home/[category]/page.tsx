import { Metadata } from "next";
import CategoryFeed from "./category-feed";

export function generateMetadata({ params }: any): Metadata {
  const { category } = params as { category: string };
  return {
    title: `${category}`,
  };
}

export default function Page({ params }: any) {
  const { category } = params as { category: string };
  return (
    <main className="flex w-full flex-col">
      <CategoryFeed category={category} />
    </main>
  );
}
