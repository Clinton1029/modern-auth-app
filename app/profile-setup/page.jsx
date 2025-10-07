"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfileSetup() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile saved:", form);
    router.push("/premium"); // 👈 Next step
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 px-4"
    >
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/70 border border-gray-200/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/60 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/60 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/60 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Continue
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

