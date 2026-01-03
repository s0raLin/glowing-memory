import React from 'react';
import { Calendar, Clock, Tag, FileX } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  readTime: string;
  content: string;
}

interface ArticleListProps {
  articles: Article[];
  selectedArticleId?: string;
  onSelectArticle: (id: string) => void;
}

export function ArticleList({ articles, selectedArticleId, onSelectArticle }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <FileX className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-lg text-muted-foreground mb-2">没有找到文章</h3>
        <p className="text-sm text-muted-foreground">
          尝试调整搜索条件或筛选标签
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-4 text-foreground">文章列表</h2>
      {articles.map((article) => (
        <article
          key={article.id}
          onClick={() => onSelectArticle(article.id)}
          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
            selectedArticleId === article.id
              ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-md'
              : 'border-border hover:border-primary/50 hover:shadow-md'
          }`}
        >
          <h3 className="text-base font-semibold mb-2 text-foreground line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
            {article.description}
          </p>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
              {article.tags.length > 2 && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground">
                  +{article.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}