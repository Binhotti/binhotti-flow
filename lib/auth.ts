import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
const COOKIE = "binhotti_session";
function secret() {
  const v = process.env.AUTH_SECRET;
  if (!v) throw new Error("AUTH_SECRET não configurado.");
  return new TextEncoder().encode(v);
}
export async function createSession(userId: string, remember = true) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(remember ? "30d" : "1d")
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: remember ? 2592000 : undefined,
  });
}
export async function clearSession() {
  (await cookies()).delete(COOKIE);
}
export async function getSessionUser() {
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.userId !== "string") return null;
    return prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, currency: true },
    });
  } catch {
    return null;
  }
}
export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}
