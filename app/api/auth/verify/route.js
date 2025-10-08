import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.json({ error: "Invalid verification link" }, { status: 400 });
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.identifier !== email || record.expires < new Date()) {
    return NextResponse.json({ error: "Token invalid or expired" }, { status: 400 });
  }

  // Mark user verified
  await prisma.user.update({
    where: { email },
    data: { emailVerified: true },
  });

  // Delete token after use
  await prisma.verificationToken.delete({ where: { token } });

  return NextResponse.json({ message: "Email verified successfully!" });
}
