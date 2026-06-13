import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      // If it's the first time logging in, attach the raw GitHub ID to the token
      if (profile) {
        token.githubId = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the GitHub ID into the user session so the frontend components can see it
      if (session.user) {
        (session.user as any).githubId = token.githubId;
      }
      return session;
    },
  },
});

// Next.js App Router requires exporting specific HTTP methods
export { handler as GET, handler as POST };