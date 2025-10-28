import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Instagram from "next-auth/providers/instagram";
import { PrismaClient } from "@prisma/client";
import { authConfig } from "./auth.config";

// Validar variáveis de ambiente necessárias
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET não está definido no .env.local");
}

if (!process.env.INSTAGRAM_CLIENT_ID || !process.env.INSTAGRAM_CLIENT_SECRET) {
  throw new Error(
    "INSTAGRAM_CLIENT_ID e INSTAGRAM_CLIENT_SECRET devem estar definidos no .env.local"
  );
}

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Instagram({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.userId = token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});
