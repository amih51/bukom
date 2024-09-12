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
  RiNotificationFill,
  RiNotificationLine,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreatePostDialog } from "../post/editor/create-post-dialog";
import { useTheme } from "next-themes";
import Image from "next/image";

const MenuBar = forwardRef<HTMLDivElement, { className: string }>(
  ({ className }, ref) => {
    const { theme } = useTheme();
    const { data: session } = useSession();
    const user = session?.user;

    const pathName = usePathname();

    return (
      <div ref={ref} className={className}>
        <div className="flex w-full flex-col justify-between sm:w-fit lg:w-full">
          <div className="flex w-full flex-row justify-between px-6 sm:flex-col sm:gap-5 sm:px-0">
            <Link href="/" className="my-6 hidden text-2xl font-bold lg:block">
              {theme === "dark" ? (
                <Image
                  src={"/HMIFess-white-02.png"}
                  alt={"HMIFess logo dark"}
                  width={192}
                  height={192}
                />
              ) : (
                <Image
                  src={"/HMIFess-02.png"}
                  alt={"HMIFess logo"}
                  width={192}
                  height={192}
                />
              )}
            </Link>
            <Button
              variant={pathName === "/home" ? "secondary" : "ghost"}
              className="flex h-fit w-fit items-center lg:w-full"
            >
              <Link href="/home" className="flex size-full flex-row text-lg">
                {pathName === "/home" ? (
                  <RiHomeFill className="size-6 flex-shrink-0" />
                ) : (
                  <RiHomeLine className="size-6 flex-shrink-0" />
                )}

                <p className="ml-2 hidden truncate lg:inline">Home</p>
              </Link>
            </Button>
            <Button
              variant={pathName === "/search" ? "secondary" : "ghost"}
              className="flex h-fit w-fit items-center lg:w-full"
            >
              <Link href="/search" className="flex size-full flex-row text-lg">
                {pathName === "/search" ? (
                  <RiSearchFill className="size-6 flex-shrink-0" />
                ) : (
                  <RiSearchLine className="size-6 flex-shrink-0" />
                )}

                <p className="ml-2 hidden truncate lg:inline">Search</p>
              </Link>
            </Button>
            <Button
              variant={pathName === "/bookmarks" ? "secondary" : "ghost"}
              className="flex h-fit w-fit items-center lg:w-full"
            >
              <Link
                href="/bookmarks"
                className="flex size-full flex-row text-lg"
              >
                {pathName === "/bookmarks" ? (
                  <RiBookmarkFill className="size-6 flex-shrink-0" />
                ) : (
                  <RiBookmarkLine className="size-6 flex-shrink-0" />
                )}

                <p className="ml-2 hidden truncate lg:inline">Bookmarks</p>
              </Link>
            </Button>
            <Button
              variant={
                pathName === `/${user?.username}` ? "secondary" : "ghost"
              }
              className="flex h-fit w-fit items-center lg:w-full"
            >
              <Link
                href={`/${user?.username}`}
                className="flex size-full flex-row text-lg"
              >
                {pathName === `/${user?.username}` ? (
                  <RiUserFill className="size-6 flex-shrink-0" />
                ) : (
                  <RiUserLine className="size-6 flex-shrink-0" />
                )}

                <p className="ml-2 hidden truncate lg:inline">Profile</p>
              </Link>
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
