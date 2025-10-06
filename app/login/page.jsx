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
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-[300px] h-[300px] bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm backdrop-blur-xl bg-white/80 dark:bg-gray-900/60 border border-gray-200/40 dark:border-gray-800/40 shadow-xl rounded-2xl p-5 sm:p-6"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className={`w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/60 border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={`w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/60 border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              } text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center mt-5 gap-2">
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/5"></div>
          <span className="text-gray-500 dark:text-gray-400 text-xs">or</span>
          <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/5"></div>
        </div>

        {/* OAuth */}
        <div className="mt-3 flex gap-2">
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
        <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-4">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
