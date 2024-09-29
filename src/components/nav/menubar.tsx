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
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import { usePathname } from "next/navigation";
import { CreatePostDialog } from "../post/editor/create-post-dialog";
import Logo from "../logo";
import Link from "next/link";

const MenuBar = forwardRef<HTMLDivElement, { className: string }>(
  ({ className }, ref) => {
    const { data: session } = useSession();
    const user = session?.user;
    const pathName = usePathname();

    return (
      <div ref={ref} className={className}>
        <div className="flex w-full flex-col justify-between sm:w-fit lg:w-full">
          <div className="flex w-full flex-row justify-between px-6 sm:flex-col sm:gap-3 sm:px-0">
            <Button
              asChild
              aria-label="HMIFess"
              variant={"ghost"}
              className="my-6 hidden h-fit items-start text-2xl font-bold hover:bg-transparent lg:block"
            >
              <Link
                aria-label="Home"
                className="flex items-center justify-center"
                href="/"
              >
                <Logo />
              </Link>
            </Button>
            <Button
              asChild
              aria-label="Home"
              variant={"ghost"}
              className={`flex h-12 w-fit items-center justify-start rounded-full text-lg ${
                pathName === "/home" ? "font-bold" : ""
              }`}
            >
              <Link href="/home">
                {pathName === "/home" ? (
                  <RiHomeFill className="size-6" />
                ) : (
                  <RiHomeLine className="size-6" />
                )}
                <span className="ml-2 hidden lg:inline">Home</span>
              </Link>
            </Button>
            <Button
              asChild
              aria-label="Search"
              variant={"ghost"}
              className={`flex h-12 w-fit items-center justify-start rounded-full text-lg ${
                pathName === "/notifications" ? "font-bold" : ""
              }`}
            >
              <Link href="/notifications">
                {pathName === "/notifications" ? (
                  <RiNotificationFill className="size-6" />
                ) : (
                  <RiNotificationLine className="size-6" />
                )}
                <span className="ml-2 hidden lg:inline">Search</span>
              </Link>
            </Button>
            <Button
              asChild
              aria-label="Bookmarks"
              variant={"ghost"}
              className={`flex h-12 w-fit items-center justify-start rounded-full text-lg ${
                pathName === "/bookmarks" ? "font-bold" : ""
              }`}
            >
              <Link href="/bookmarks">
                {pathName === "/bookmarks" ? (
                  <RiBookmarkFill className="size-6" />
                ) : (
                  <RiBookmarkLine className="size-6" />
                )}
                <span className="ml-2 hidden lg:inline">Bookmarks</span>
              </Link>
            </Button>
            <Button
              asChild
              aria-label="Profile"
              variant={"ghost"}
              className={`flex h-12 w-fit items-center justify-start rounded-full text-lg ${
                pathName === `/${user?.username}` ? "font-bold" : ""
              }`}
            >
              <Link href={`/${user?.username}`}>
                {pathName === `/${user?.username}` ? (
                  <RiUserFill className="size-6" />
                ) : (
                  <RiUserLine className="size-6" />
                )}
                <span className="ml-2 hidden lg:inline">Profile</span>
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
