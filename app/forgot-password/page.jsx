"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-[300px] h-[300px] bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm backdrop-blur-xl 
                   bg-white/90 dark:bg-gray-900/60 
                   border border-gray-200/40 dark:border-gray-800/40 
                   shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                   hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] 
                   hover:-translate-y-1 
                   transition-all duration-500 
                   rounded-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Forgot Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Enter your email to reset your password
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <Mail className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-3"
          >
            <CheckCircle2 className="text-green-500 w-10 h-10 mx-auto" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              We’ve sent a password reset link to:
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm break-all">
              {email}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Please check your inbox and follow the instructions.
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-6">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
