import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role = "user" } = body;

    // ✅ 1. Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // ✅ 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    // ✅ 3. Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    // ✅ 4. Create verification token (valid 24 hours)
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    // ✅ 5. Load Mailtrap credentials
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailHost = process.env.EMAIL_HOST;
    const emailPort = Number(process.env.EMAIL_PORT);

    if (!emailUser || !emailPass || !emailHost || !emailPort) {
      console.error("❌ Missing Mailtrap environment variables");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // ✅ 6. Setup Nodemailer with Mailtrap
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      auth: { user: emailUser, pass: emailPass },
    });

    // ✅ 7. Create verification link
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // ✅ 8. Compose email
    const mailOptionsToUser = {
      from: `"Support Team" <no-reply@example.com>`,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <h3>Hello ${name || "User"},</h3>
        <p>Thanks for registering!</p>
        <p>Please confirm your email by clicking below:</p>
        <a href="${verifyUrl}" style="background:#2563eb;color:white;padding:10px 16px;border-radius:6px;text-decoration:none;">Verify Email</a>
        <p>If that doesn't work, paste this link in your browser:</p>
        <p>${verifyUrl}</p>
      `,
    };

    // ✅ 9. Send the email
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { message: "User registered successfully. Verification email sent (via Mailtrap)." },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in registration route:", error);
    return NextResponse.json(
      { error: "Internal server error.", details: error.message },
      { status: 500 }
    );
  }
}
