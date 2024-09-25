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
    <div className="flex h-2/3 flex-auto flex-col items-center justify-center gap-6 md:h-full">
      <div>
        <h1 className="mb-4 text-5xl font-bold">Your Space, Your Voice.</h1>
        <h2 className="mb-8 text-2xl font-semibold">
          HMIFess: Where HMIF Students Connect & Share
        </h2>
        <p className="text-justify text-lg">
          Welcome to <span className="font-bold">HMIFess</span>, the exclusive
          online forum for HMIF students at ITB. Whether you want to share
          insights, ask questions, or just connect with fellow students, HMIFess
          is the place to be. Join our community, where your thoughts matter,
          and every post can spark a conversation.
        </p>
      </div>
      <div className="flex w-full flex-col items-center">
        <Button
          variant={"ghost"}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/home?justLoggedIn=true",
            })
          }
          className="flex w-1/2 flex-row items-center border p-2"
        >
          <FaGoogle size={16} className="mr-2" />
          <p>Sign In</p>
        </Button>
        {error && (
          <p className="text-center font-bold text-destructive">{error}</p>
        )}
      </div>
    </div>
  );
}
