"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      const errorParam = searchParams.get("error");
      if (errorParam) {
        setError(errorParam);
      }
    }
  }, [searchParams]);
  return (
    <div className="sm: flex h-5/6 flex-auto flex-col items-center justify-between sm:items-start sm:justify-center sm:gap-12 md:h-full">
      <div className="font-stretchPro">
        <h1 className="mb-4 text-2xl">Hey,</h1>
        <h1 className="mb-4 text-5xl font-bold sm:text-6xl lg:text-7xl">
          PIPPPS!
        </h1>
      </div>
      <div className="flex w-full flex-col items-center sm:items-start">
        <Button
          variant={"ghost"}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/home?justLoggedIn=true",
            })
          }
          className="flex w-fit flex-row border p-2 px-12"
        >
          <FaGoogle size={16} className="mr-2" />
          <p>Sign In with Std Email</p>
        </Button>
        {error && (
          <p className="text-center font-bold text-destructive">{error}</p>
        )}
      </div>
    </div>
  );
}
