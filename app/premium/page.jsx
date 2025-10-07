"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const router = useRouter();

  const handleUpgrade = () => {
    console.log("Upgraded to premium");
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/70 border border-gray-200/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Upgrade to Premium 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Enjoy exclusive features, priority support, and premium analytics.
        </p>

        <div className="space-y-3 mb-8">
          <div className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            ✅ Access advanced analytics
          </div>
          <div className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            ✅ Priority dashboard access
          </div>
          <div className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            ✅ Premium support 24/7
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleUpgrade}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Upgrade Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
