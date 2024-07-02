import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../lib/db';
import { Collection } from 'mongodb';

// Extend the Session interface
interface ExtendedSession extends Session {
  accessToken?: string;
}

interface Account {
  providerAccountId?: string;
  access_token?: string;
  refresh_token?: string;
}

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any, // Type assertion to avoid conflicts
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log('SignIn callback initiated', { user, account });
      try {
        const client = await clientPromise;
        const db = client.db();
        const userCollection: Collection = db.collection('users');

        console.log('Checking for existing user');
        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (existingUser) {
          console.log('Existing user found', existingUser);
          if (
            existingUser.accounts?.google?.providerAccountId !==
            account?.providerAccountId
          ) {
            console.log('Updating existing user');
            await userCollection.deleteOne({ email: user.email });
            await createNewUser(userCollection, user, account);
          } else {
            console.log('Updating existing user');
            await updateExistingUser(userCollection, user, account);
          }
        } else {
          console.log('Creating new user');
          await createNewUser(userCollection, user, account);
        }

        console.log('SignIn process completed successfully');
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        accessToken: token.accessToken as string,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};

async function createNewUser(
  userCollection: Collection,
  user: User,
  account: Account | null,
) {
  const newUser = {
    name: user.name,
    email: user.email,
    image: user.image,
    loginCount: 1,
    accounts: {
      google: account
        ? {
            providerAccountId: account.providerAccountId,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
          }
        : null,
    },
  };
  await userCollection.insertOne(newUser);
}

async function updateExistingUser(
  userCollection: Collection,
  user: User,
  account: Account | null,
) {
  const updateData: any = {
    $set: {
      name: user.name,
      image: user.image,
    },
    $inc: { loginCount: 1 },
  };

  if (account) {
    updateData.$set['accounts.google'] = {
      providerAccountId: account.providerAccountId,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
    };
  }

  await userCollection.updateOne({ email: user.email }, updateData);
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
