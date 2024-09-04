import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (!session?.user) redirect("/");

  return { children };
}
