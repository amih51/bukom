"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
import { Check, LogOut, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import {
  AvatarIcon,
  Half2Icon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";

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
            className="h-fit w-full border"
          >
            {user?.image ? (
              <Image
                src={user?.image || ""}
                alt={user?.name || "warga biasa"}
                width={32}
                height={32}
                className="mx-2 size-8 rounded-full"
              />
            ) : (
              <AvatarIcon className="mx-2 size-8" />
            )}
            <div className="flex flex-col text-left">
              <p className="truncate text-lg">{user?.name}</p>
              <p className="truncate text-sm opacity-50">{user?.email}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <Half2Icon className="mr-2 size-4" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="cursor-pointer"
                >
                  <Monitor className="mr-2 size-4" />
                  System default
                  {theme === "system" && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer"
                >
                  <SunIcon className="mr-2 size-4" />
                  Light
                  {theme === "light" && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer"
                >
                  <MoonIcon className="mr-2 size-4" />
                  Dark
                  {theme === "dark" && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group cursor-pointer">
            <LogOut className="mr-2 size-4" />
            <button onClick={() => signOut()}>Sign Out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}
