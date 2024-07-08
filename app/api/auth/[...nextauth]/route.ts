import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../lib/db';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Si necesitas exportar authOptions para usarlo en otro lugar:
export { authOptions };
