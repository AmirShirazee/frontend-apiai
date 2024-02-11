import { useEffect, useState } from 'react';
import fetchUser from './fetchUser';

interface Session {
  user: {
    id: string;
    token: string;
  };
}

type Status = 'authenticated' | 'unauthenticated' | 'loading';

const useUserData = (
  session: Session,
  status: Status,
): {
  isLoading: boolean;
  allData: any;
  isToastOpen: boolean;
  setIsToastOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  editorSettings: EditorSettings | null;
  error: Error | null;
  didUpload: boolean;
} => {
  const [didUpload, setDidUpload] = useState<boolean>(false);
  const [editorSettings, setEditorSettings] = useState<EditorSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUser(session.user.id, session.user.token)
        .then((data) => {
          setAllData(data.data);
          setDidUpload(data.data.didUpload);
          setEditorSettings(data.data.editorSettings);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          console.error('Error fetching user data:', error);
          setError(error);
          setIsLoading(false);
          setIsToastOpen(true);
        });
    }
  }, [session, status]);

  return {
    didUpload,
    editorSettings,
    allData,
    isLoading,
    error,
    isToastOpen,
    setIsToastOpen,
  };
};

export interface EditorSettings {
  readOnly: boolean;
  showLineNumbers: boolean;
  tabSize: number;
  displayIndentGuides: boolean;
  highlightActiveLine: boolean;
  highlightSelectedWord: boolean;
}

export default useUserData;
