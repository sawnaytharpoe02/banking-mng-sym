"use server";

import { LoginFormSchema } from "@/schemas";
import { SignJWT, jwtVerify, EncryptJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secretkey";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function hashedPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
}

export async function login(values: z.infer<typeof LoginFormSchema>) {
  // Verify credentials
  const result = LoginFormSchema.safeParse(values);

  if (result.success === false) {
    return { error: "Invalid fields." };
  }

  const { name, password } = result.data;

  const isAuthenticated =
    name === process.env.LOGIN_USER &&
    (await hashedPassword(password)) === process.env.LOGIN_PASSWORD;

  if (!isAuthenticated) return { error: "Invalid credentials." };

  const user = { name, password };
  // Create the session (removing expires as you mentioned)
  const session = await encrypt({ user });

  // Save the session in a cookie
  cookies().set("session", session, { httpOnly: true });

  return { success: "Logged in!" };
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
