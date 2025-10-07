"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Crown, User, ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const [user, setUser] = useState({ name: "Clinton" }); // replace with real user data later

  useEffect(() => {
    // you could fetch user details here if needed
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl 
                   bg-white/90 dark:bg-gray-900/60 
                   border border-gray-200/40 dark:border-gray-800/40 
                   shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                   hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] 
                   hover:-translate-y-1 
                   transition-all duration-500 
                   rounded-2xl p-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome, {user.name}! 🎉
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You’ve successfully registered. Choose what you’d like to do next.
        </p>

        <div className="grid gap-4">
          {/* Complete Profile */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-5 bg-white/80 dark:bg-gray-800/60 rounded-xl shadow-md border border-gray-200/30 dark:border-gray-700/40 text-left"
          >
            <div className="flex items-center gap-3">
              <User className="text-blue-600 dark:text-blue-400" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Complete Your Profile
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add personal info and preferences to get started.
                </p>
              </div>
            </div>
            <Link
              href="/profile-setup"
              className="mt-3 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Continue <ArrowRight size={16} className="ml-1" />
            </Link>
          </motion.div>

          {/* Upgrade to Premium */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-5 bg-gradient-to-br from-yellow-400/20 to-amber-500/10 rounded-xl shadow-md border border-amber-400/40 dark:border-amber-500/40 text-left"
          >
            <div className="flex items-center gap-3">
              <Crown className="text-yellow-500" size={24} />
              <div>
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Upgrade to Premium
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Unlock exclusive features and analytics dashboards.
                </p>
              </div>
            </div>
            <Link
              href="/premium"
              className="mt-3 inline-flex items-center text-yellow-600 dark:text-yellow-400 font-medium hover:underline"
            >
              Upgrade Now <ArrowRight size={16} className="ml-1" />
            </Link>
          </motion.div>
        </div>

        {/* Dashboard button */}
        <Link
          href="/dashboard"
          className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </motion.div>
  );
}
