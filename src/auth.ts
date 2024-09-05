import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      userName: string;
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
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (existingUser && !existingUser.userName) {
        const generateUserName = (name: string): string[] => {
          const sanitized = name.toLowerCase().replace(/\s+/g, "");
          const possibleUserNames = [
            sanitized,
            sanitized.replace(" ", "_"),
            `${sanitized}${Math.floor(Math.random() * 1000000)}`,
          ];
          return possibleUserNames;
        };

        let newUserName = generateUserName(user.name || "")[0];
        let isUnique = false;
        let attempt = 0;

        while (!isUnique) {
          const checkUser = await prisma.user.findUnique({
            where: { userName: newUserName },
          });

          if (!checkUser) {
            isUnique = true;
          } else {
            attempt++;
            const possibleUserNames = generateUserName(user.name || "");
            newUserName = possibleUserNames[attempt % possibleUserNames.length];
          }
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { userName: newUserName },
        });
      }

      return true;
    },
    async session({ session, user }) {
      const userData = await prisma.user.findUnique({
        where: { id: user.id },
        select: { userName: true },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          userName: userData?.userName,
        },
      };
    },
  },
});
