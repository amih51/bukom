"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import {
  PiCircleHalfFill,
  PiMonitor,
  PiMonitorFill,
  PiMoon,
  PiMoonFill,
  PiSignOut,
  PiSun,
  PiSunFill,
} from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileButton() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  if (session) {
    const user = session.user;

    return (
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            variant={"ghost"}
            className="size-full justify-start overflow-hidden p-2 lg:px-4"
            size={"icon"}
          >
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
            <div className="ml-4 hidden flex-col overflow-hidden text-left lg:flex">
              <p className="truncate text-lg">{user?.name}</p>
              <p className="truncate text-sm opacity-50">@{user?.username}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <PiCircleHalfFill className="mr-2 size-4" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="cursor-pointer"
                >
                  {theme === "system" ? (
                    <PiMonitorFill className="mr-2 size-4" />
                  ) : (
                    <PiMonitor className="mr-2 size-4" />
                  )}
                  System default
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer"
                >
                  {theme === "light" ? (
                    <PiSunFill className="mr-2 size-4" />
                  ) : (
                    <PiSun className="mr-2 size-4" />
                  )}
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer"
                >
                  {theme === "dark" ? (
                    <PiMoonFill className="mr-2 size-4" />
                  ) : (
                    <PiMoon className="mr-2 size-4" />
                  )}
                  Dark
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group cursor-pointer">
            <PiSignOut className="mr-2 size-4" />
            <button onClick={() => signOut()}>Sign Out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
}
