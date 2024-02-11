/*eslint-disable */

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFetchUserQuery } from '@/redux/userSlice';
import { EditorSettings } from '@/utils/useUserData';
import fetchUser from '@/utils/fetchUser';

export interface UserData {
  data: {
    username: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date | null;
    isVerified: boolean;
    isAdmin: boolean;
    token: string;
    didUpload: boolean;
    uploadedAtDate: string;
    editorSettings: EditorSettings;
    project: boolean;
  };
}

const getUser = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<any>(null);

  const { data, isLoading: loadingQuery } = useFetchUserQuery(session?.user?.id!, {
    skip: status !== 'authenticated',
  });

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUser(session?.user?.id, session?.user?.token)
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          setError(err);
        });
    } else {
      setUserData(null);
    }
  }, [session, status]);

  // Use loadingQuery directly instead of isLoading
  return { userData, isLoading: loadingQuery, error };
};

export default getUser;
