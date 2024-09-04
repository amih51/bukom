"use client";

import { useSession } from "next-auth/react";
import ProfileButton from "./profile-btn";
import { Button } from "../ui/button";

export default function MenuBar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="max-w-1/5 sticky left-0 top-12 flex max-h-[calc(100vh-3rem)] flex-grow border px-6">
      <div className="flex flex-grow flex-col justify-between border">
        <div>
          <Button
            variant={"ghost"}
            className="flex h-fit w-full items-center border"
          >
            <a href="/home" className="size-full text-lg">
              Home
            </a>
          </Button>
          <Button
            variant={"ghost"}
            className="flex h-fit w-full items-center border"
          >
            <a href="/explore" className="size-full text-lg">
              Explore
            </a>
          </Button>
          <Button
            variant={"ghost"}
            className="flex h-fit w-full items-center border"
          >
            <a href="/notifications" className="size-full text-lg">
              Notifications
            </a>
          </Button>
          <Button
            variant={"ghost"}
            className="flex h-fit w-full items-center border"
          >
            <a href="/bookmarks" className="size-full text-lg">
              Bookmarks
            </a>
          </Button>
          <Button
            variant={"ghost"}
            className="flex h-fit w-full items-center border"
          >
            <a href={`/${user?.name}`} className="size-full text-lg">
              Profile
            </a>
          </Button>
        </div>
        <div className="mb-4">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}
