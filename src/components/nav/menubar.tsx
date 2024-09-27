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
              aria-label="HMIFess"
              variant={"ghost"}
              className="my-6 hidden h-fit items-start text-2xl font-bold hover:bg-transparent lg:block"
            >
              <Link
                aria-label="Home"
                className="m-0 flex items-center justify-center"
                href={"/"}
              >
                <Logo />
              </Link>
            </Button>
            <Button
              aria-label="Home"
              variant={"ghost"}
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              <Link
                className={`flex size-full ${
                  pathName === "/home" ? "font-bold" : ""
                }`}
                href={"/home"}
              >
                {pathName === "/home" ? (
                  <RiHomeFill className="size-6 flex-shrink-0" />
                ) : (
                  <RiHomeLine className="size-6 flex-shrink-0" />
                )}

                <p className="ml-2 hidden truncate lg:inline">Home</p>
              </Link>
            </Button>
            <Button
              aria-label="Search"
              variant={"ghost"}
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              <Link
                className={`flex size-full ${
                  pathName === "/search" ? "font-bold" : ""
                }`}
                href={"/search"}
              >
                {pathName === "/search" ? (
                  <RiSearchFill className="size-6 flex-shrink-0" />
                ) : (
                  <RiSearchLine className="size-6 flex-shrink-0" />
                )}

                <p className="ml-2 hidden truncate lg:inline">Search</p>
              </Link>
            </Button>
            <Button
              aria-label="Bookmarks"
              variant={"ghost"}
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              <Link
                className={`flex size-full ${
                  pathName === "/bookmarks" ? "font-bold" : ""
                }`}
                href={"/bookmarks"}
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
              aria-label="Profile"
              variant={"ghost"}
              className="flex h-fit w-fit items-center justify-start text-lg lg:w-full"
            >
              <Link
                className={`flex size-full ${
                  pathName === `/${user?.username}` ? "font-bold" : ""
                }`}
                href={`/${user?.username}`}
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
