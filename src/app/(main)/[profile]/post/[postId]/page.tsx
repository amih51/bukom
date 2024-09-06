import { Metadata } from "next";

export async function generateMetadata({
  params: { postId },
}: {
  params: { postId: string };
}): Promise<Metadata> {
  return {
    title: `${postId}`,
  };
}

export default async function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  return (
    <main className="flex items-center justify-center">/post/{postId}</main>
  );
}
