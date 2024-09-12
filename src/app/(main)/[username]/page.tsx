import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";
import ProfileFeed from "./profile-feed";
import { prisma } from "@/lib/prisma";

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

  return (
    <main className="flex w-full flex-col">
      <div>
        <div>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user?.username}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="w-full">
            <div className="ml-4 hidden flex-col overflow-hidden text-left lg:flex">
              <p className="truncate text-lg">{user?.name}</p>
              <p className="truncate text-sm opacity-50">@{user?.username}</p>
            </div>
          </div>
          {username === user?.username && <div>edit</div>}
        </div>
      </div>
      {user?.id && <ProfileFeed userId={user.id} />}
    </main>
  );
}
