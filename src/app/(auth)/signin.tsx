"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="flex h-2/3 flex-auto items-center justify-center border-2 md:h-full">
      <Button
        variant={"ghost"}
        onClick={() => signIn("google")}
        className="flex flex-row items-center border p-2"
      >
        <FaGoogle size={16} className="mr-2" />
        <p>Sign In</p>
      </Button>
    </div>
  );
}
