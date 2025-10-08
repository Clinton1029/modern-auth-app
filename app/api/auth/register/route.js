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

    // ✅ Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: "User exists" }), { status: 409 });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashed, role },
    });

    // ✅ Create verification token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // ✅ Function to create transporter dynamically
    const createTransporter = async () => {
      try {
        // Try secure port 465 first
        const transporter465 = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        await transporter465.verify();
        return transporter465;
      } catch (err) {
        console.warn("⚠️ Port 465 failed, retrying on 587...");
        // Try STARTTLS on port 587
        const transporter587 = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        await transporter587.verify();
        return transporter587;
      }
    };

    const transporter = await createTransporter();

    // ✅ Send email
    await transporter.sendMail({
      from: `"Mtawa Auth" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Confirm your email",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="color:#2563eb;">Welcome${name ? `, ${name}` : ""} 👋</h2>
          <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
          <a href="${verifyUrl}" 
             style="display:inline-block;background:#2563eb;color:white;padding:10px 18px;
                    text-decoration:none;border-radius:6px;margin-top:10px;">
             Verify Email
          </a>
          <p>If the button doesn’t work, copy and paste this link into your browser:</p>
          <p>${verifyUrl}</p>
          <hr />
          <small>This link will expire in 24 hours.</small>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        message: "User registered successfully. Verification email sent.",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: error.message }),
      { status: 500 }
    );
  }
}
