"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState({ name: "Clinton", role: "user" });

  useEffect(() => {
    // Simulated data fetch
    setTimeout(() => {
      setData([
        { name: "Mon", usage: 5 },
        { name: "Tue", usage: 7 },
        { name: "Wed", usage: 3 },
        { name: "Thu", usage: 8 },
        { name: "Fri", usage: 6 },
      ]);
    }, 1000);
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading your dashboard...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/40 dark:border-gray-800/40"
      >
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Here’s a quick summary of your activity this week.
        </p>

        {/* Weekly Usage Chart */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Weekly Usage Overview
          </h2>
          <div className="bg-white dark:bg-gray-900/70 rounded-2xl p-5 shadow-md border border-gray-200/20 dark:border-gray-800/40">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Current Plan", value: "Free Tier", color: "from-blue-500 to-indigo-600" },
            { title: "Tasks Completed", value: "45", color: "from-green-500 to-emerald-600" },
            { title: "Projects Active", value: "3", color: "from-purple-500 to-pink-600" },
            { title: "Messages", value: "12", color: "from-amber-500 to-orange-600" },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-md bg-gradient-to-br ${card.color} text-white text-center transition-all`}
            >
              <h3 className="text-lg font-medium mb-1">{card.title}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
