import React, { useState } from 'react';
import { Calendar, Clock, Tag, TrendingUp, Sparkles, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import type { Article } from './ArticleList';

interface HomeProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
}

export function Home({ articles, onSelectArticle }: HomeProps) {
  const [showAllArticles, setShowAllArticles] = useState(false);
  
  // 获取最新的 6 篇文章
  const latestArticles = articles.slice(0, 6);
  
  // 获取所有标签及其文章数量
  const tagCounts = articles.reduce((acc, article) => {
    article.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-7 h-7 animate-pulse" />
            <span className="text-sm uppercase tracking-widest font-semibold opacity-90">欢迎来到</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            我的技术博客
          </h1>
          <p className="text-xl md:text-2xl opacity-95 mb-8 leading-relaxed">
            分享关于前端开发、React、TypeScript 和 Web 技术的见解与经验
          </p>
          <div className="flex flex-wrap gap-4 text-base">
            <div className="flex items-center gap-3 bg-white/25 px-6 py-3 rounded-full backdrop-blur-md border border-white/30 shadow-lg">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">{articles.length} 篇文章</span>
            </div>
            <div className="flex items-center gap-3 bg-white/25 px-6 py-3 rounded-full backdrop-blur-md border border-white/30 shadow-lg">
              <Tag className="w-5 h-5" />
              <span className="font-medium">{Object.keys(tagCounts).length} 个标签</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Articles */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-7 h-7 text-blue-500 dark:text-blue-400" />
          <h2 className="text-3xl font-bold">最新文章</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="group bg-card rounded-2xl border border-border p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                {article.description}
              </p>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Tag className="w-7 h-7 text-purple-500 dark:text-purple-400" />
            <h2 className="text-3xl font-bold">热门标签</h2>
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <div className="flex flex-wrap gap-3">
              {popularTags.map(([tag, count]) => (
                <button
                  key={tag}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium"
                >
                  <span>{tag}</span>
                  <span className="ml-2 text-sm opacity-75">({count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Preview - Collapsible */}
      {articles.length > 6 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">更多文章</h2>
            <button
              onClick={() => setShowAllArticles(!showAllArticles)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
            >
              <span className="text-sm font-medium">
                {showAllArticles ? '收起' : `展开 (${articles.length - 6} 篇)`}
              </span>
              {showAllArticles ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {showAllArticles && (
            <div className="space-y-3">
              {articles.slice(6).map(article => (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article.id)}
                  className="group bg-card rounded-xl border border-border p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* About Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-border shadow-sm">
        <h2 className="text-3xl font-bold mb-6">关于本博客</h2>
        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
          这是一个基于 React + TypeScript + Vite 构建的现代化博客系统，支持 Markdown 渲染、代码高亮和主题切换。
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✓</span>
            <span>完整的 Markdown 支持，包括 GFM 扩展语法</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✓</span>
            <span>多种编程语言的代码高亮</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✓</span>
            <span>优雅的深色/浅色主题切换</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-xl">✓</span>
            <span>响应式设计，完美适配各种设备</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
