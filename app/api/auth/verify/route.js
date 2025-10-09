import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    // ✅ Validate query params
    if (!token || !email) {
      return NextResponse.json(
        { error: "Missing token or email." },
        { status: 400 }
      );
    }

    // ✅ Find verification token in database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.identifier !== email) {
      return NextResponse.json(
        { error: "Invalid or expired verification link." },
        { status: 400 }
      );
    }

    // ✅ Check if token expired
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.json(
        { error: "Verification link has expired." },
        { status: 400 }
      );
    }

    // ✅ Update user as verified
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // ✅ Delete token after verification
    await prisma.verificationToken.delete({ where: { token } });

    // ✅ Redirect user to success page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/verified-success`
    );
  } catch (error) {
    console.error("❌ Error in verify route:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
