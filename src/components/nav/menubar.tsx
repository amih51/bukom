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

const MenuBar = forwardRef<HTMLDivElement, { className: string }>(
  ({ className }, ref) => {
    const { data: session } = useSession();
    const user = session?.user;

    const pathName = usePathname();

    return (
      <div ref={ref} className={className}>
        <div className="flex w-full flex-col justify-between sm:w-fit sm:border-x-2 lg:w-full">
          <div className="flex w-full flex-row justify-between sm:flex-col">
            <Button
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
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
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:hidden sm:border-x-0 sm:border-b-2 lg:w-full"
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
              variant={"ghost"}
              className="flex h-fit w-fit items-center overflow-hidden border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
            >
              <Link
                href="/notifications"
                className="flex size-full flex-row text-lg"
              >
                {pathName === "/notifications" ? (
                  <RiNotificationFill className="size-6 flex-shrink-0" />
                ) : (
                  <RiNotificationLine className="size-6 flex-shrink-0" />
                )}

                <p className="ml-2 hidden truncate lg:inline">Notifications</p>
              </Link>
            </Button>
            <Button
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
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
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
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
          </div>
          <div className="mb-4 hidden sm:flex">
            <ProfileButton />
          </div>
        </div>
      </div>
    );
  },
);
MenuBar.displayName = "MenuBar";

export default MenuBar;
