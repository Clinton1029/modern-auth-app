"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, CheckCircle2, Lock } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [strength, setStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ Read token from the URL
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  // ✅ Password strength logic
  useEffect(() => {
    const checkStrength = (value) => {
      if (value.length < 6) return "Weak";
      if (/[A-Z]/.test(value) && /[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value))
        return "Strong";
      if (/[A-Z]/.test(value) || /[0-9]/.test(value)) return "Medium";
      return "Weak";
    };
    setStrength(checkStrength(password));
  }, [password]);

  const getStrengthColor = () => {
    if (strength === "Weak") return "text-red-500";
    if (strength === "Medium") return "text-yellow-500";
    if (strength === "Strong") return "text-green-500";
    return "text-gray-400";
  };

  // ✅ Handle Reset Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError("Reset link expired or invalid.");

    if (password.length < 6) return alert("Password must be at least 6 characters.");
    if (password !== confirm) return alert("Passwords do not match.");

    setLoading(true);
    setError("");

    try {
      // Later, you’ll call your backend API:
      // const res = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password }),
      // });

      // const data = await res.json();
      // if (!res.ok) throw new Error(data.error);

      setTimeout(() => {
        setLoading(false);
        setResetSuccess(true);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#8b5cf6", "#22c55e"],
        });
      }, 1200);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl top-[-80px] left-[-80px]" />
      <div className="absolute w-[300px] h-[300px] bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl bottom-[-80px] right-[-80px]" />

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
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Enter your new password below
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {!resetSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>

            {/* Strength */}
            {password && (
              <p className={`text-xs font-medium ${getStrengthColor()}`}>
                Password Strength: {strength}
              </p>
            )}

            {/* Confirm */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={16} />
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
                  <Loader2 className="animate-spin w-4 h-4" /> Resetting...
                </>
              ) : (
                "Reset Password"
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
            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Password reset successfully!
            </p>
            <Link
              href="/login"
              className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm mt-2"
            >
              Back to Login
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
