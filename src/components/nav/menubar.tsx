"use client";

import { forwardRef } from "react";
import { useSession } from "next-auth/react";
import ProfileButton from "./profile-btn";
import { Button } from "../ui/button";
import {
  BellIcon,
  BookmarkIcon,
  HomeIcon,
  PersonStandingIcon,
  SearchIcon,
} from "lucide-react";

const MenuBar = forwardRef<HTMLDivElement, { className: string }>(
  ({ className }, ref) => {
    const { data: session } = useSession();
    const user = session?.user;

    return (
      <div ref={ref} className={className}>
        <div className="flex w-full flex-col justify-between sm:w-fit sm:border-x-2 lg:w-full">
          <div className="flex w-full flex-row justify-between sm:flex-col">
            <Button
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
            >
              <a href="/home" className="flex size-full flex-row text-lg">
                <HomeIcon className="flex-shrink-0" />
                <p className="ml-2 hidden truncate lg:inline">Home</p>
              </a>
            </Button>
            <Button
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:hidden sm:border-x-0 sm:border-b-2 lg:w-full"
            >
              <a href="/search" className="flex size-full flex-row text-lg">
                <SearchIcon className="flex-shrink-0" />
                <p className="ml-2 hidden truncate lg:inline">Search</p>
              </a>
            </Button>
            <Button
              variant={"ghost"}
              className="flex h-fit w-fit items-center overflow-hidden border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
            >
              <a
                href="/notifications"
                className="flex size-full flex-row text-lg"
              >
                <BellIcon className="flex-shrink-0" />
                <p className="ml-2 hidden truncate lg:inline">Notifications</p>
              </a>
            </Button>
            <Button
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
            >
              <a href="/bookmarks" className="flex size-full flex-row text-lg">
                <BookmarkIcon className="flex-shrink-0" />
                <p className="ml-2 hidden truncate lg:inline">Bookmarks</p>
              </a>
            </Button>
            <Button
              variant={"ghost"}
              className="flex h-fit w-fit items-center border-x-2 sm:border-x-0 sm:border-b-2 lg:w-full"
            >
              <a
                href={`/${user?.name}`}
                className="flex size-full flex-row text-lg"
              >
                <PersonStandingIcon className="flex-shrink-0" />
                <p className="ml-2 hidden truncate lg:inline">Profile</p>
              </a>
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
