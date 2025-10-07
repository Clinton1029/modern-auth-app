"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import LoadingSkeleton from "./LoadingSkeleton";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState({ name: "Clinton", role: "admin" }); // change to "user" to test

  useEffect(() => {
    setTimeout(() => {
      setData([
        { name: "Jan", sales: 4000, revenue: 2400 },
        { name: "Feb", sales: 3000, revenue: 1398 },
        { name: "Mar", sales: 2000, revenue: 9800 },
        { name: "Apr", sales: 2780, revenue: 3908 },
        { name: "May", sales: 1890, revenue: 4800 },
      ]);
    }, 1500);
  }, []);

  if (!data) return <LoadingSkeleton />;

  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "user" },
    { id: 2, name: "Bob Martin", email: "bob@example.com", role: "user" },
    { id: 3, name: "Diana Smith", email: "diana@example.com", role: "admin" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="p-6 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
      </h1>

      {/* Common Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white/90 dark:bg-gray-900/60 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Monthly Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/90 dark:bg-gray-900/60 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Revenue Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Product A", value: 400 },
                  { name: "Product B", value: 300 },
                  { name: "Product C", value: 300 },
                  { name: "Product D", value: 200 },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                <Cell fill="#6366F1" />
                <Cell fill="#8B5CF6" />
                <Cell fill="#EC4899" />
                <Cell fill="#F59E0B" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Admin Section */}
      {user.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 dark:bg-gray-900/70 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 border border-gray-200/30 dark:border-gray-800/40"
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-700 dark:text-blue-400">
            User Management
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-700 dark:text-gray-300 border-b border-gray-300/20 dark:border-gray-700/30">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <motion.tr
                    key={u.id}
                    whileHover={{ scale: 1.02 }}
                    className="border-b border-gray-200/20 dark:border-gray-800/30"
                  >
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200 font-medium">{u.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{u.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          u.role === "admin"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                            : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex justify-center gap-3">
                      <button className="px-3 py-1 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* User Section */}
      {user.role === "user" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 p-8 rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-800/50"
        >
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">
            Your Account Summary
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You have <span className="font-semibold text-indigo-500">3</span>{" "}
            active subscriptions and <span className="font-semibold text-indigo-500">5</span> support tickets.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
