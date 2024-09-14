import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";
import ProfileFeed from "./profile-feed";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import FollowButton from "./follow-btn";
import { FollowerInfo, UserInclude } from "@/lib/types";
import EditProfileButton from "./edit-profile-btn";
import { formatNumber } from "@/lib/utils";
import { cache } from "react";
import FollowerCount from "@/components/followers-count";

const getUser = cache(async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    include: UserInclude,
  });

  return user;
});

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

  const followerInfo: FollowerInfo = {
    followers: user._count.follower,
    isFollowedByUser: user.follower.some(
      ({ followerId }) => followerId === session?.user.id,
    ),
  };

  return (
    <main className="flex w-full flex-col">
      <div className="my-2 flex w-full flex-row overflow-hidden">
        <Avatar className="m-2 size-20">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{user?.username}</AvatarFallback>
        </Avatar>
        <div className="ml-2 flex w-full flex-col overflow-hidden">
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col text-left">
              <p className="truncate text-lg">{user?.name}</p>
              <p className="truncate text-sm opacity-50">@{user?.username}</p>
            </div>
            <div className="">
              {session?.user.id === user?.id ? (
                <EditProfileButton user={user} />
              ) : (
                <FollowButton userId={user.id} initialState={followerInfo} />
              )}
            </div>
          </div>
          <div className="text-sm opacity-60">
            menfess: <span className="font-semibold">{user._count.posts}</span>{" "}
            follower:{" "}
            <FollowerCount userId={user.id} initialState={followerInfo} />{" "}
            following:{" "}
            <span className="font-semibold">{user._count.following}</span>
          </div>
          <div className="size-full">{user.bio}</div>
        </div>
      </div>
      {user?.id && <ProfileFeed userId={user.id} />}
    </main>
  );
}
