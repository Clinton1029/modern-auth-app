import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role = "user" } = body;

    // 1️⃣ Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // 2️⃣ Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    // 3️⃣ Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    // 4️⃣ Create verification token (valid for 24 hours)
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    // 5️⃣ Load Gmail credentials
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Missing EMAIL_USER or EMAIL_PASS in environment.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // 6️⃣ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS
      auth: { user: emailUser, pass: emailPass },
    });

    // 7️⃣ Verification email link
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // 8️⃣ Email content
    const mailOptionsToUser = {
      from: emailUser,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <h3>Hello ${name || "User"},</h3>
        <p>Thank you for registering on our platform!</p>
        <p>Please confirm your email address by clicking the button below:</p>
        <a href="${verifyUrl}"
           style="display:inline-block;background:#2563eb;color:white;
                  padding:10px 16px;border-radius:6px;text-decoration:none;">
          Verify Email
        </a>
        <p>If the button doesn't work, copy and paste this link in your browser:</p>
        <p>${verifyUrl}</p>
        <hr/>
        <small>This link expires in 24 hours.</small>
      `,
    };

    // 9️⃣ Send verification email
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { message: "User registered successfully. Verification email sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration route:", error);
    return NextResponse.json(
      { error: "Internal server error.", details: error.message },
      { status: 500 }
    );
  }
}
