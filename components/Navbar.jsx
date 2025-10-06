"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Temporary mock user (replace with NextAuth later)
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
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-blue-600 hover:opacity-90 transition"
        >
          ModernAuth
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>

          {user ? (
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
              <img
                src={user.avatar || "/avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium text-gray-800">{user.name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-100"
          >
            <div className="flex flex-col items-center gap-5 py-6">
              <Link
                href="/"
                className="text-gray-800 text-lg font-medium hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-800 text-lg font-medium hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              {user ? (
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                  <img
                    src={user.avatar || "/avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="font-medium text-gray-800">
                    {user.name}
                  </span>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
