import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../lib/db';
import { Collection } from 'mongodb';

// Define interfaces for our user and account objects
interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Account {
  providerAccountId?: string;
  access_token?: string;
  refresh_token?: string;
}

const authOptions: NextAuthOptions = {
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
      try {
        const client = await clientPromise;
        const db = client.db();
        const userCollection: Collection = db.collection('users');

        // Buscar si ya existe un usuario con este email
        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (existingUser) {
          // Verificar si el usuario existente tiene una cuenta de Google
          if (
            existingUser.accounts?.google?.providerAccountId !==
            account?.providerAccountId
          ) {
            // Si no coincide, eliminar el usuario existente
            await userCollection.deleteOne({ email: user.email });
            // Crear un nuevo usuario
            await createNewUser(userCollection, user, account);
          } else {
            // Actualizar información del usuario existente
            await updateExistingUser(userCollection, user, account);
          }
        } else {
          // Crear nuevo usuario
          await createNewUser(userCollection, user, account);
        }

        return true;
      } catch (error) {
        console.error('Error handling sign in:', error);
        return false;
      }
    },
    // ... (rest of the callbacks remain the same)
  },
  // ... (rest of the config remains the same)
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
