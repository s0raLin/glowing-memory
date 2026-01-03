import React from 'react';
import { Github, Mail, Rss } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于 */}
          <div>
            <h3 className="mb-4 text-foreground">关于本站</h3>
            <p className="text-sm text-muted-foreground">
              一个基于 React + TypeScript + Vite 构建的现代化博客系统，
              支持 Markdown 渲染、代码高亮和主题切换。
            </p>
          </div>

          {/* 链接 */}
          <div>
            <h3 className="mb-4 text-foreground">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  首页
                </a>
              </li>
              <li>
                <a
                  href="/public/articles"
                  onClick={(e) => handleLinkClick(e, '/public/articles')}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  文章归档
                </a>
              </li>
              <li>
                <a
                  href="/public/articles/README.md"
                  onClick={(e) => handleLinkClick(e, '/public/articles/README.md')}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  使用指南
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="mb-4 text-foreground">联系方式</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-muted-foreground" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-muted-foreground" />
              </a>
              <a
                href="/rss"
                onClick={(e) => handleLinkClick(e, '/rss')}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                aria-label="RSS"
              >
                <Rss className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} 我的博客. 基于 React + TypeScript + Vite 构建
          </p>
          <p className="mt-2">
            <span className="inline-flex items-center gap-1">
              Made with <span className="text-destructive">❤</span> by Figma Make
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
