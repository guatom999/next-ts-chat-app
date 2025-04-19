import NextAuth from "next-auth";
// import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

export const hanlder = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      // console.log("Session:", session);
      // console.log("Token:", token);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { hanlder as GET, hanlder as POST };
