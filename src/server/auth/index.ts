import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '~/env';
import UserModel from '~/server/models/user';

import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              console.error('🚀 ~ password mismatch');
              throw new Error('Incorrect password, Check your password');
            }
          } else {
            console.error('🚀 ~ User not found');
            throw new Error('User not found');
          }
        } catch (error) {
          throw new Error(
            error instanceof Error
              ? error.message
              : 'An error occurred during authorization'
          );
        }
      },
    }),
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
});
