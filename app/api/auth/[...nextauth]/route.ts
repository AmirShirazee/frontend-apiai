import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import sanitize from 'mongo-sanitize';
import bcrypt from 'bcryptjs';
import { User, UserDocument } from '@/shared/models/user.model';
import {
  validateAdvancedLoginInput,
  validateBasicLoginInput,
} from '@/shared/models/validations/user.validation';
import connectDB from '@/db/mongo';

export interface CustomJWT extends JWT {
  id?: string;
  username?: string;
  isVerified?: boolean;
  didUpload?: boolean;
  project?: boolean;
  isAdmin?: boolean;
  email?: string;
  userId?: string;
  token?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<CustomJWT | null> {
        // await connectDB();

        try {
          const basicValidation = validateBasicLoginInput(credentials);
          if (basicValidation.error) {
            throw new Error(basicValidation.error.details[0].message);
          }

          let sanitizedInput = sanitize<{ username: string; password: string }>(credentials);
          sanitizedInput.username = credentials.username.toLowerCase();

          const user: UserDocument | null = await getUserByUsername(sanitizedInput.username);

          if (!user) {
            throw new Error('Invalid username');
          }

          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordMatch) {
            throw new Error('Invalid password');
          }

          const advancedValidation = validateAdvancedLoginInput(sanitizedInput);
          if (advancedValidation.error) {
            throw new Error(advancedValidation.error.details[0].message);
          }

          if (!user.isVerified) {
            throw new Error('Your account has not been verified. Please activate your account.');
          }

          return {
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            token: user.token,
            didUpload: user.didUpload,
            project: user.project,
            id: user._id.toString(),
          };
        } catch (err: any) {
          console.error('Error in authorize function:', err.message);
          throw new Error(err.message);
        }
      },
    }),
    GithubProvider({
      clientId: process.env['GITHUB_ID'] ?? '',
      clientSecret: process.env['GITHUB_SECRET'] ?? '',
    }),
  ],
  secret: process.env['NEXTAUTH_SECRET'],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      const customToken = token as CustomJWT;

      if (user && account) {
        // For new sign-ins
        customToken.userId = user.id;
        //@ts-ignore
        customToken.username = user.username;
        //@ts-ignore
        customToken.isVerified = user.isVerified;
        //@ts-ignore
        customToken.didUpload = user.didUpload;
        //@ts-ignore
        customToken.project = user.project;
        //@ts-ignore
        customToken.isAdmin = user.isAdmin;
      } else if (token && token.userId) {
        return token;
      }

      return customToken;
    },
    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.user.username = token.username as string;
      session.user.isVerified = token.isVerified as boolean;
      session.user.didUpload = token.didUpload as boolean;
      session.user.project = token.project as boolean;
      session.user.isAdmin = token.isAdmin as boolean;

      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };

async function getUserByUsername(username: string): Promise<UserDocument | null> {
  try {
    // Query the database for a user with the given username
    return await User.findOne({ username: username.toLowerCase() }).exec();
  } catch (error) {
    // Handle any errors that occur during the query
    console.error('Error fetching user by username:', error);
    throw error; // Or handle this error as you see fit
  }
}
