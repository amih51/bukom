"use client";

import { forwardRef } from "react";
import { useSession } from "next-auth/react";
import ProfileButton from "./profile-btn";
import { Button } from "../ui/button";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHomeFill,
  RiHomeLine,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { CreatePostDialog } from "../post/editor/create-post-dialog";
import { useTheme } from "next-themes";
import Image from "next/image";

const MenuBar = forwardRef<HTMLDivElement, { className: string }>(
  ({ className }, ref) => {
    const { theme } = useTheme();
    const { data: session } = useSession();
    const router = useRouter();
    const user = session?.user;

    const pathName = usePathname();

    return (
      <div ref={ref} className={className}>
        <div className="flex w-full flex-col justify-between sm:w-fit lg:w-full">
          <div className="flex w-full flex-row justify-between px-6 sm:flex-col sm:gap-3 sm:px-0">
            <Button
              onClick={() => router.push("/")}
              variant={"ghost"}
              className="my-6 hidden h-fit items-start text-2xl font-bold hover:bg-transparent lg:block"
            >
              {theme === "dark" ? (
                <Image
                  src={"/HMIFess-white-02.png"}
                  alt={"HMIFess logo dark"}
                  width={192}
                  height={192}
                />
              ) : theme === "light" ? (
                <Image
                  src={"/HMIFess-02.png"}
                  alt={"HMIFess logo"}
                  width={192}
                  height={192}
                />
              ) : (
                <Image
                  src={"/HMIFess-01.png"}
                  alt={"HMIFess logo"}
                  width={192}
                  height={192}
                />
              )}
            </Button>
            <Button
              onClick={() => router.push("/home")}
              variant={pathName === "/home" ? "secondary" : "ghost"}
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              {pathName === "/home" ? (
                <RiHomeFill className="size-6 flex-shrink-0" />
              ) : (
                <RiHomeLine className="size-6 flex-shrink-0" />
              )}

              <p className="ml-2 hidden truncate lg:inline">Home</p>
            </Button>
            <Button
              onClick={() => router.push("/search")}
              variant={pathName === "/search" ? "secondary" : "ghost"}
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              {pathName === "/search" ? (
                <RiSearchFill className="size-6 flex-shrink-0" />
              ) : (
                <RiSearchLine className="size-6 flex-shrink-0" />
              )}

              <p className="ml-2 hidden truncate lg:inline">Search</p>
            </Button>
            <Button
              onClick={() => router.push("/bookmarks")}
              variant={pathName === "/bookmarks" ? "secondary" : "ghost"}
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              {pathName === "/bookmarks" ? (
                <RiBookmarkFill className="size-6 flex-shrink-0" />
              ) : (
                <RiBookmarkLine className="size-6 flex-shrink-0" />
              )}

              <p className="ml-2 hidden truncate lg:inline">Bookmarks</p>
            </Button>
            <Button
              onClick={() => router.push(`/${user?.username}`)}
              variant={
                pathName === `/${user?.username}` ? "secondary" : "ghost"
              }
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              {pathName === `/${user?.username}` ? (
                <RiUserFill className="size-6 flex-shrink-0" />
              ) : (
                <RiUserLine className="size-6 flex-shrink-0" />
              )}

              <p className="ml-2 hidden truncate lg:inline">Profile</p>
            </Button>
            <CreatePostDialog />
          </div>
          <div className="mb-4 hidden w-14 sm:flex lg:w-full">
            <div className="w-full truncate lg:mx-1">
              <ProfileButton />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
MenuBar.displayName = "MenuBar";

export default MenuBar;
