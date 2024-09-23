import bcrypt from 'bcryptjs';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '~/env';
import UserModel from '~/server/models/user';

import { authConfig } from './auth.config';

async function refreshAccessToken(token: any) {
  try {
    const url = `https://oauth2.googleapis.com/token?${new URLSearchParams({
      client_id: env.AUTH_GOOGLE_ID,
      client_secret: env.AUTH_GOOGLE_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    })}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const updatedTokens = await response.json();

    if (!response.ok) {
      throw updatedTokens;
    }

    return {
      ...token,
      accessToken: updatedTokens.access_token,
      accessTokenExpires: Date.now() + updatedTokens.expires_in * 1000,
      refreshToken: updatedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

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
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === 'credentials') {
          return {
            user,
          };
        } else {
          return {
            accessToken: account.access_token,
            accessTokenExpires: Date.now() + (account.expires_in ?? 0) * 1000,
            refreshToken: account.refresh_token,
            user,
          };
        }
      }

      if (typeof token.accessTokenExpires === 'number') {
        if (Date.now() < token.accessTokenExpires) {
          return token;
        } else {
          return refreshAccessToken(token);
        }
      } else if (typeof token.exp === 'number') {
        if (Date.now() < token.exp * 1000) {
          return token;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as User;
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token?.error) {
        session.error = token.error as string;
      }

      return session;
    },
  },
});
