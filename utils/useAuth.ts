import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useAuthCheck = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      signIn();
    } else {
      setIsLoading(false);
    }
  }, [status, router]);

  return isLoading;
};

export default useAuthCheck;
