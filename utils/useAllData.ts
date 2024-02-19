"use client";

import { getSession, useSession } from "next-auth/react";
import useUserData from "@/utils/useUserData";

export function useAllData() {
  const { data: session, status } = useSession();
  const { allData } = useUserData(session!, status);
  return allData;
}

export async function getToken(req: any) {
  const session = await getSession({ req });
  return session?.user?.token;
}
