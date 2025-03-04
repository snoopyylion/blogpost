import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({ user, profile}) {

      const { name, email, image } = user;
      const { id, login, bio } = profile;

      const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { 
        id: id,
      });

      if(!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || '',
        });
      }

      return true
    },
    async jwt({ token, account, profile}: { token: JWT, account: any, profile?: any }) {
      if(account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

        token.id = user?._id;
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      Object.assign(session, {
        id: token.id
      });
      return session
    }
  }
})