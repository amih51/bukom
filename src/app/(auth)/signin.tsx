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
    <div className="flex h-2/3 flex-auto flex-col items-center justify-center border-2 md:h-full">
      <Button
        variant={"ghost"}
        onClick={() => signIn("google")}
        className="flex flex-row items-center border p-2"
      >
        <FaGoogle size={16} className="mr-2" />
        <p>Sign In</p>
      </Button>
      {error && (
        <p className="text-center font-bold text-destructive">{error}</p>
      )}
    </div>
  );
}
