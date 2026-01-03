import React from 'react';
import { Github, Mail, Rss } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于 */}
          <div>
            <h3 className="mb-4">关于本站</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              一个基于 React + TypeScript + Vite 构建的现代化博客系统，
              支持 Markdown 渲染、代码高亮和主题切换。
            </p>
          </div>

          {/* 链接 */}
          <div>
            <h3 className="mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  首页
                </a>
              </li>
              <li>
                <a 
                  href="/public/articles"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  文章归档
                </a>
              </li>
              <li>
                <a 
                  href="/public/articles/README.md"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  使用指南
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="mb-4">联系方式</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="/rss"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="RSS"
              >
                <Rss className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} 我的博客. 基于 React + TypeScript + Vite 构建
          </p>
          <p className="mt-2">
            <span className="inline-flex items-center gap-1">
              Made with <span className="text-red-500">❤</span> by Figma Make
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
