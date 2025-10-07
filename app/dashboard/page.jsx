// Filename: app/dashboard/page.jsx
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
import {
  Settings,
  Users,
  PieChart as PieIcon,
  Bell,
  Search,
  Grid,
  Menu,
} from "lucide-react";

const lineData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 520 },
  { name: "Mar", users: 610 },
  { name: "Apr", users: 700 },
  { name: "May", users: 820 },
  { name: "Jun", users: 900 },
  { name: "Jul", users: 980 },
  { name: "Aug", users: 1050 },
  { name: "Sep", users: 1100 },
  { name: "Oct", users: 1250 },
  { name: "Nov", users: 1390 },
  { name: "Dec", users: 1500 },
];

const barData = [
  { name: "Mon", sessions: 240 },
  { name: "Tue", sessions: 300 },
  { name: "Wed", sessions: 260 },
  { name: "Thu", sessions: 320 },
  { name: "Fri", sessions: 410 },
  { name: "Sat", sessions: 260 },
  { name: "Sun", sessions: 180 },
];

const pieData = [
  { name: "Free", value: 400 },
  { name: "Pro", value: 300 },
  { name: "Enterprise", value: 300 },
];
const COLORS = ["#6366F1", "#8B5CF6", "#22C55E"];

const users = [
  { id: 1, name: "Clinton A.", email: "clinton@example.com", role: "Admin", joined: "2023-01-23" },
  { id: 2, name: "Sara M.", email: "sara@example.com", role: "Editor", joined: "2023-03-11" },
  { id: 3, name: "Ibrahim K.", email: "ibrahim@example.com", role: "Viewer", joined: "2023-05-04" },
  { id: 4, name: "Aisha T.", email: "aisha@example.com", role: "Pro", joined: "2023-07-19" },
  { id: 5, name: "James L.", email: "james@example.com", role: "Pro", joined: "2024-02-01" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`hidden md:flex flex-col w-72 p-6 gap-6 h-screen sticky top-0`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">M</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">ModernAuth</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Dashboard</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            <a className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Grid size={18} /> <span className="font-medium">Overview</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Users size={18} /> <span className="font-medium">Users</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <PieIcon size={18} /> <span className="font-medium">Plans</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Settings size={18} /> <span className="font-medium">Settings</span>
            </a>
          </nav>

          <div className="mt-auto p-3 rounded-xl bg-gradient-to-tr from-white/60 to-gray-50/30 dark:from-gray-800/30 dark:to-gray-900/30 border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">Need help?</p>
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Support</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">support@modernauth.com</p>
              </div>
              <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow">Contact</button>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <main className="flex-1 p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
              >
                <Menu size={18} />
              </button>

              <div className="relative">
                <input placeholder="Search users, plans..." className="w-full md:w-96 pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">C</div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800 dark:text-gray-100">Clinton</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div className="p-5 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-md" whileHover={{ y: -6 }}>
              <p className="text-xs text-gray-500">Total Users</p>
              <h3 className="text-2xl font-semibold mt-2">1,532</h3>
              <p className="text-sm text-green-500 mt-2">+12.4% this month</p>
            </motion.div>

            <motion.div className="p-5 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-md" whileHover={{ y: -6 }}>
              <p className="text-xs text-gray-500">Active Sessions</p>
              <h3 className="text-2xl font-semibold mt-2">428</h3>
              <p className="text-sm text-yellow-500 mt-2">+3.1% today</p>
            </motion.div>

            <motion.div className="p-5 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-md" whileHover={{ y: -6 }}>
              <p className="text-xs text-gray-500">Revenue</p>
              <h3 className="text-2xl font-semibold mt-2">$9,420</h3>
              <p className="text-sm text-blue-500 mt-2">+7.8% this month</p>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div className="p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-md" whileHover={{ y: -6 }}>
              <h4 className="text-sm text-gray-500">Users Over Time</h4>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div className="p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-md" whileHover={{ y: -6 }}>
              <h4 className="text-sm text-gray-500">Sessions by Day</h4>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#8B5CF6" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Table + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-md" whileHover={{ y: -6 }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm text-gray-500">Users</h4>
                <div className="flex items-center gap-2">
                  <input placeholder="Search users" className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-sm" />
                  <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">Invite</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b border-gray-100">
                      <th className="py-3">Name</th>
                      <th className="py-3">Email</th>
                      <th className="py-3">Role</th>
                      <th className="py-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <td className="py-3">{u.name}</td>
                        <td className="py-3 text-sm text-gray-500">{u.email}</td>
                        <td className="py-3">{u.role}</td>
                        <td className="py-3 text-sm text-gray-500">{u.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div className="p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-md" whileHover={{ y: -6 }}>
              <h4 className="text-sm text-gray-500">Activity</h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium">New user signed up</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mt-2" />
                  <div>
                    <p className="text-sm font-medium">User updated plan</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <h5 className="text-xs text-gray-500">Revenue breakdown</h5>
                <div style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" innerRadius={40} outerRadius={60}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} ModernAuth — built with ♥</footer>
        </main>
      </div>
    </div>
  );
}
