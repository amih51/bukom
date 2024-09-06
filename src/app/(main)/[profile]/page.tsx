import { Metadata } from "next";

export async function generateMetadata({
  params: { profile },
}: {
  params: { profile: string };
}): Promise<Metadata> {
  return {
    title: `${profile}`,
  };
}

export default async function Page({
  params: { profile },
}: {
  params: { profile: string };
}) {
  return <main className="flex items-center justify-center">/{profile}</main>;
}
