import { Metadata } from "next";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Home() {
  const session = await getSession();
  if (!session?.user) redirect("/");

  const user = session.user;

  return (
    <main className="flex items-center justify-center">{user.username}</main>
  );
}
