import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Auth0Provider from 'next-auth/providers/auth0';
import clientPromise from '../auth/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection('users')
          .findOne({ email: session.user.email });
        if (user) {
          session.user.name = user.name;
        }
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
