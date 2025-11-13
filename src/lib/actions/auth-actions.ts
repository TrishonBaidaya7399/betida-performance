"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import * as jose from "jose";

// --- These must match in all your auth files ---
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "session_token";
// ---
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validUsers: Record<string, string> = {
    "admin@gmail.com": "Password@1",
  };

  if (validUsers[email] === password) {
    // --- THIS IS THE NEW (AND CRUCIAL) PART ---

  // 1. Create the token (payload)
  const userPayload = { email: email, sub: email };
  const token = await new jose.SignJWT(userPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // 24-hour session
    .sign(JWT_SECRET);

  // 2. Set the secure, httpOnly cookie
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true, // Prevents client-side JS from accessing it
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });
  
  // --- END OF NEW PART ---
    revalidatePath("/");
    return { success: true, message: "Login successful" };
  }
  return { success: false, message: "Invalid email or password" };
}

export async function verifyOTPAction(formData: FormData) {
  const otp = formData.get("otp") as string;

  const validOTPs: Record<string, boolean> = {
    "12345": true,
  };

  if (validOTPs[otp]) {
    revalidatePath("/");
    return { success: true, message: "OTP verified" };
  }
  return { success: false, message: "Invalid OTP" };
}
