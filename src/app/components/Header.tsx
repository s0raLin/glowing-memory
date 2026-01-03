import React from 'react';
import { Sun, Moon, FileText, House } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  onHomeClick?: () => void;
  showHomeButton?: boolean;
}

export function Header({ onHomeClick, showHomeButton = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-[1400px]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              我的博客
            </h1>
          </div>
          
          {showHomeButton && onHomeClick && (
            <button
              onClick={onHomeClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:shadow-md"
            >
              <House className="w-4 h-4" />
              <span>首页</span>
            </button>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="relative p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-200 hover:shadow-md group"
          aria-label="切换主题"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-secondary-foreground group-hover:rotate-12 transition-transform duration-200" />
          ) : (
            <Sun className="w-5 h-5 text-secondary-foreground group-hover:rotate-12 transition-transform duration-200" />
          )}
        </button>
      </div>
    </header>
  );
}