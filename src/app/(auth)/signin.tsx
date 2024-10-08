"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [verifyReq, setVerifyReq] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      const errorParam = searchParams.get("error");
      if (errorParam) {
        setError(errorParam);
      }
      const verifyReqParam = searchParams.get("verifyReq");
      if (verifyReqParam) {
        setVerifyReq(
          "Please check your inbox, and if you don't see the email, check your spam or junk folder as well.",
        );
      }
    }
  }, [searchParams]);

  return (
    <div className="flex h-5/6 flex-auto flex-col items-center justify-between gap-6 md:h-full md:items-start">
      <div>
        <h1 className="mb-4 text-5xl font-bold">Your Space, Your Voice.</h1>
      </div>
      <div className="flex w-1/2 min-w-[180px] flex-col items-center justify-center">
        {verifyReq && <p className="mb-3 text-center font-bold">{verifyReq}</p>}
        {error && (
          <p className="text-center font-bold text-destructive">{error}</p>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;

            if (!email || !email.endsWith("itb.ac.id")) {
              setError("Email must end with itb.ac.id.");
              return;
            }

            await signIn("resend", {
              email,
            });
          }}
          className="flex w-full flex-col gap-1"
        >
          <Input
            className="border"
            type="email"
            name="email"
            placeholder="00000000@mahasiswa.itb.ac.id"
            required
          />
          <Button className="border px-12" variant={"ghost"} type="submit">
            Sign in with ITB Account
          </Button>
        </form>
        or
        <Button
          variant={"ghost"}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/home?justLoggedIn=true",
            })
          }
          className="flex w-full flex-row items-center border p-2"
        >
          <FaGoogle size={16} className="mr-2" />
          <p>Sign In with Std Email</p>
        </Button>
      </div>
    </div>
  );
}
