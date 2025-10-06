"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mock user (replace with NextAuth user later)
  const user = null;
  // const user = { name: "Clinton", avatar: "/avatar.png" };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/60 border-b border-gray-200/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition"
        >
          ModernAuth
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            Dashboard
          </Link>

          {user ? (
            <div className="flex items-center gap-3 bg-gradient-to-r from-gray-100/60 to-gray-200/40 dark:from-gray-800/40 dark:to-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-full px-3 py-1 shadow-sm hover:shadow-md transition-all">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 2 }}
                src={user.avatar || "/avatar.png"}
                alt="avatar"
                className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 object-cover"
              />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {user.name}
              </span>
              <button className="p-1 hover:text-red-500 transition">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-xl bg-white/90 dark:bg-gray-900/80 shadow-lg border-t border-gray-200/20 dark:border-gray-800/30"
          >
            <div className="flex flex-col items-center gap-5 py-6">
              <Link
                href="/"
                className="text-gray-800 dark:text-gray-100 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-800 dark:text-gray-100 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              {user ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={user.avatar || "/avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700"
                  />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {user.name}
                  </span>
                  <button className="flex items-center gap-2 text-sm text-red-500 font-semibold mt-2">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Link
                    href="/login"
                    className="w-32 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-md transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="w-32 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
