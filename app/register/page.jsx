"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  useEffect(() => {
    let score = 0;
    if (passwordValue.length >= 6) score += 1;
    if (/[A-Z]/.test(passwordValue)) score += 1;
    if (/[0-9]/.test(passwordValue)) score += 1;
    if (/[^A-Za-z0-9]/.test(passwordValue)) score += 1;
    setStrength(score);
  }, [passwordValue]);

  const onSubmit = async (data) => {
    console.log("Registration data:", data);
    // will connect to backend later
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm backdrop-blur-xl bg-white/80 dark:bg-gray-900/60 border border-gray-200/40 dark:border-gray-800/40 shadow-xl rounded-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Join and start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className={`mt-1 w-full px-4 py-2.5 rounded-lg bg-white/80 dark:bg-gray-800/60 border ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`mt-1 w-full px-4 py-2.5 rounded-lg bg-white/80 dark:bg-gray-800/60 border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
              className={`mt-1 w-full px-4 py-2.5 rounded-lg bg-white/80 dark:bg-gray-800/60 border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Password strength bar */}
            <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(strength / 4) * 100}%`,
                  backgroundColor:
                    strength === 1
                      ? "#ef4444"
                      : strength === 2
                      ? "#f59e0b"
                      : strength === 3
                      ? "#3b82f6"
                      : "#22c55e",
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              {...register("confirmPassword")}
              className={`mt-1 w-full px-4 py-2.5 rounded-lg bg-white/80 dark:bg-gray-800/60 border ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Creating...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mt-6 gap-2">
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/5"></div>
          <span className="text-gray-500 dark:text-gray-400 text-xs">or</span>
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/5"></div>
        </div>

        {/* OAuth */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-2 rounded-lg bg-white/70 dark:bg-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200 text-sm font-medium"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-4 h-4"
            />
            Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-2 rounded-lg bg-white/70 dark:bg-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200 text-sm font-medium"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-4 h-4"
            />
            GitHub
          </motion.button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
