import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";

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
    error: "/",
  },
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (!user.username) {
        let baseUsername = user.name
          ? user.name.toLowerCase().replace(/\s/g, "_")
          : user.email?.split("@")[0] || "user";

        let username = baseUsername;
        let count = 1;

        while (await prisma.user.findUnique({ where: { username } })) {
          username = `${baseUsername}${count}`;
          count++;
        }

        user.username = username;
      }
      return true;
    },
    async session({ session, user }) {
      session.user.username = user.username;
      return session;
    },
  },
});
