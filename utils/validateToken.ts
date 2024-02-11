import { getToken, JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default async function validateToken(
  req: NextRequest,
  secret: string,
): Promise<JWT | null> {
  const token: JWT | null = await getToken({ req, secret });
  if (!token) {
    throw new Error("Unauthorized");
  }
  return token;
}
