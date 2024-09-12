import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";
import ProfileFeed from "./profile-feed";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const getUser = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  return user;
};

export function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Metadata {
  return {
    title: `${username}`,
  };
}

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await getUser(username);

  if (!user) return notFound();

  const session = await auth();

  return (
    <main className="flex w-full flex-col">
      <div className="my-2 flex w-full flex-row overflow-hidden border-2 sm:border-l-0">
        <Avatar className="m-2 size-32">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col overflow-hidden border-l-2">
          <div className="flex w-full flex-row border-b-2">
            <div className="mx-2 flex w-full flex-row items-center">
              <p className="truncate text-lg">{user?.name}</p>
              <p className="truncate pl-2 text-sm opacity-50">
                @{user?.username}
              </p>
            </div>
            {session?.user.id === user?.id && (
              <Button variant={"ghost"} className="border-l-2">
                edit
              </Button>
            )}
          </div>
          <div>bio</div>
        </div>
      </div>
      {user?.id && <ProfileFeed userId={user.id} />}
    </main>
  );
}
