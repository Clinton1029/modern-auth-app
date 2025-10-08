import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      return NextResponse.json(
        { error: "Invalid verification link" },
        { status: 400 }
      );
    }

    // 🔹 Find the token in database
    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json(
        { error: "Verification token not found or already used" },
        { status: 404 }
      );
    }

    // 🔹 Ensure token matches email and isn’t expired
    if (record.identifier !== email || record.expires < new Date()) {
      return NextResponse.json(
        { error: "Token invalid or expired" },
        { status: 400 }
      );
    }

    // 🔹 Mark user as verified
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // 🔹 Delete the used token
    await prisma.verificationToken.delete({
      where: { token },
    });

    // 🔹 Option 1: Redirect user to a success page
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`);

    // 🔹 Option 2: If you want to return JSON instead, use this instead:
    // return NextResponse.json({ message: "Email verified successfully!" });

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Server error during verification", details: error.message },
      { status: 500 }
    );
  }
}
