import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role = "user" } = body;

    // ✅ Validate required fields
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User exists" }), { status: 409 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    // ✅ Create email verification token (valid for 24 hours)
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h expiry
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    // ✅ Gmail transporter (using App Password)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // use SSL for Gmail
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Verification URL
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // ✅ Send email via Gmail
    await transporter.sendMail({
      from: `"Mtawa Auth" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #2563eb;">Welcome${name ? `, ${name}` : ""}! 👋</h2>
          <p>Thank you for registering. Please verify your email by clicking the button below:</p>
          <a href="${verifyUrl}"
             style="display:inline-block;background:#2563eb;color:white;
                    padding:10px 18px;text-decoration:none;border-radius:6px;">
            Verify Email
          </a>
          <p>If the button doesn't work, use this link:</p>
          <p><a href="${verifyUrl}">${verifyUrl}</a></p>
          <hr />
          <small>This link will expire in 24 hours.</small>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message: "User registered successfully. Verification email sent via Gmail.",
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: error.message }),
      { status: 500 }
    );
  }
}
