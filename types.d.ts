// next-auth.d.ts
import { UserDocument } from '../../backend/models/user.model';

declare module 'next-auth' {
  type User = UserDocument;
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      token: string;
      isVerified: boolean;
      didUpload: boolean;
      project: boolean;
      isAdmin: boolean;
    };
  }
}
