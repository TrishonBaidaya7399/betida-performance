import { cookies } from "next/headers";
import { cache } from "react";
import * as jose from "jose";

// --- Use the same values as your action file ---
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "session_token";
// ---

/**
 * A server-side-only function that checks the auth session cookie.
 */
export const checkAuth = cache(async () => {
  try {
    // 1. Get the auth cookie from the request
    const tokenCookie = (await cookies()).get(COOKIE_NAME);

    if (!tokenCookie || !tokenCookie.value) {
      return false; // Not logged in
    }

    // 2. Verify the token is valid
    await jose.jwtVerify(tokenCookie.value, JWT_SECRET);

    // 3. If it doesn't throw an error, user is valid
    return true;

  } catch (error) {
    console.error("Auth verification error:", error);
    // Token is invalid, expired, or malformed
    return false;
  }
});