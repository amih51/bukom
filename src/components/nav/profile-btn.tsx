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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function ProfileButton() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  if (session) {
    const user = session.user;

    return (
      <AlertDialog>
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
            <AlertDialogTrigger className="flex w-full flex-row">
              <DropdownMenuItem className="w-full cursor-pointer">
                <PiSignOut className="mr-2 size-4" />
                Sign Out
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You’re just a click away from signing out. Don’t worry, we’ll be
              here when you’re ready to come back. Want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => signOut()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
}
