import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../lib/db';
import { Collection } from 'mongodb';

interface ExtendedSession extends Omit<Session, 'user'> {
  accessToken?: string;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const client = await clientPromise;
          const db = client.db();
          const userCollection: Collection = db.collection('users');

          const existingUser = await userCollection.findOne({
            email: user.email,
          });

          if (existingUser) {
            // Update existing user
            await userCollection.updateOne(
              { email: user.email },
              { $set: { name: user.name, image: user.image } },
            );
          } else {
            // Create new user
            await userCollection.insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              createdAt: new Date(),
            });
          }

          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<ExtendedSession> {
      return {
        ...session,
        accessToken: token.accessToken as string,
        user: {
          ...session.user,
          id: token.sub ?? '',
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
