import React from 'react';
import { Search, X, Tag } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  availableTags: string[];
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  availableTags
}: SearchBarProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type="text"
          placeholder="搜索文章..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="清除搜索"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* 标签筛选 */}
      {availableTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <button
            onClick={() => onTagChange('')}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm transition-all ${
              !selectedTag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            全部
          </button>
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagChange(tag === selectedTag ? '' : tag)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* 搜索结果提示 */}
      {(searchQuery || selectedTag) && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {searchQuery && selectedTag && (
            <span>搜索 "{searchQuery}" 并筛选标签 "{selectedTag}"</span>
          )}
          {searchQuery && !selectedTag && (
            <span>搜索 "{searchQuery}"</span>
          )}
          {!searchQuery && selectedTag && (
            <span>筛选标签 "{selectedTag}"</span>
          )}
        </div>
      )}
    </div>
  );
}
