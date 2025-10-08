// app/api/auth/register/route.js
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role = "user" } = body;

    // ✅ Validate fields
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // ✅ Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: "User exists" }), { status: 409 });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    });

    // ✅ Create verification token (valid for 24h)
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    // ✅ Gmail transporter (secure)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // Gmail uses SSL on port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // App password only
      },
      tls: {
        rejectUnauthorized: false, // allow local testing
      },
    });

    // ✅ Verify SMTP connection first (like your CLI test)
    await transporter.verify()
      .then(() => console.log("✅ Gmail SMTP: Server ready to take messages"))
      .catch((err) => {
        console.error("❌ Gmail SMTP verification failed:", err);
        throw new Error("SMTP connection failed. Check your Gmail App Password or network.");
      });

    // ✅ Create verification link
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // ✅ Send verification email
    await transporter.sendMail({
      from: `"Mtawa Auth" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="color:#2563eb;">Welcome${name ? `, ${name}` : ""} 👋</h2>
          <p>Thank you for signing up. Please verify your email address by clicking below:</p>
          <a href="${verifyUrl}"
             style="display:inline-block;background:#2563eb;color:white;
                    padding:10px 18px;text-decoration:none;border-radius:6px;margin-top:10px;">
             Verify Email
          </a>
          <p>If that button doesn’t work, copy this link:</p>
          <p>${verifyUrl}</p>
          <hr />
          <small>This link will expire in 24 hours.</small>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message: "User registered successfully. Verification email sent via Gmail SMTP.",
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
