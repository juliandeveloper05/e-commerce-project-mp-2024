import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/login', // Especifica el camino a tu página de login personalizada
  },
});

export { handler as GET, handler as POST };
