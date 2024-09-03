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
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function ProfileButton() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (session) {
    const user = session.user;

    return (
      <div>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Image
                src={user?.image || ""}
                alt={user?.name || "warga biasa"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="group cursor-pointer">
              <LogOut className="ml-4 -mr-2" />
              <button onClick={() => signOut()} className="ml-4">
                Sign Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}
