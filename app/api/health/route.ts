//
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ message: "OK!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
