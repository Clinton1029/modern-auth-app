"use client";

import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
    </div>
  );
}
