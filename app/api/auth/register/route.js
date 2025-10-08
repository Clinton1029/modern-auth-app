// app/api/auth/register/route.js
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, role = "user" } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return new Response(JSON.stringify({ error: "User exists" }), { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role },
  });

  // Create verification token
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  // Send verification email (Ethereal for dev or real SMTP)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

  await transporter.sendMail({
    from: `noreply@${new URL(process.env.NEXT_PUBLIC_APP_URL).hostname}`,
    to: email,
    subject: "Confirm your email",
    html: `<p>Hi ${name || ""},</p>
           <p>Click to verify your email:</p>
           <a href="${verifyUrl}">${verifyUrl}</a>`,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 201 });
}
