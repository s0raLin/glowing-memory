import React from 'react';

export function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          {/* 外圈 */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
          {/* 内圈 - 渐变色 */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-600 border-r-purple-600 border-b-transparent border-l-transparent absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
          正在加载文章...
        </p>
      </div>
    </div>
  );
}
