import React from 'react';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { Article } from './ArticleList';

interface ArticleViewProps {
  article: Article;
  onBack?: () => void;
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:shadow-md font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          返回主页
        </button>
      )}

      <article className="bg-card rounded-2xl shadow-lg border border-border p-8 md:p-12">
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {article.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-5 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="article-content">
          <MarkdownRenderer content={article.content} />
        </div>
      </article>
    </div>
  );
}
