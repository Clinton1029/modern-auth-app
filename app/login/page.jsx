"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    // Connect with NextAuth or custom backend later
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Animated background circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute w-72 h-72 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-700"></div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 border border-gray-200/40 dark:border-gray-800/40 shadow-2xl rounded-3xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account and explore your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/60 border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/60 border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mt-8 gap-3">
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/4"></div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/4"></div>
        </div>

        {/* Social Login */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-3 rounded-xl bg-white/70 dark:bg-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200 font-medium"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 py-3 rounded-xl bg-white/70 dark:bg-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200 font-medium"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-5 h-5"
            />
            GitHub
          </motion.button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
