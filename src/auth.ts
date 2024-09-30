import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

declare module "next-auth" {
  interface User {
    username?: string;
  }
  interface Session extends DefaultSession {
    user: {
      username?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/?verifyReq=true",
  },
  providers: [
    Google,
    Resend({
      from: "no-reply@itbfess.com",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.username) return true;

      const email = user.email;
      if (!email?.endsWith("itb.ac.id")) {
        return false;
      }

      let baseUsername = user.email?.substring(0, 8) || "user";

      let username = baseUsername;
      let count = 1;

      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}_${count}`;
        count++;
      }

      user.username = username;

      return true;
    },
    async session({ session, user }) {
      session.user.username = user.username;
      return session;
    },
  },
});
