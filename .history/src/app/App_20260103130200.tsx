import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { ArticleList } from './components/ArticleList';
import { ArticleView } from './components/ArticleView';
import { SearchBar } from './components/SearchBar';
import { ScrollToTop } from './components/ScrollToTop';
import { ReadingProgress } from './components/ReadingProgress';
import { Loading } from './components/Loading';
import { Footer } from './components/Footer';
import { ScrollArea } from './components/ui/scroll-area';
import { loadArticles, getAllTags, filterArticlesByTag, searchArticles } from './utils/articleLoader';
import type { Article } from './components/ArticleList';

type ViewMode = 'home' | 'articles' | 'article';

function BlogContent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // 加载文章
  useEffect(() => {
    loadArticles().then(loadedArticles => {
      setArticles(loadedArticles);
      setLoading(false);
    }).catch(error => {
      console.error('Failed to load articles:', error);
      setLoading(false);
    });
  }, []);

  // 处理浏览器前进/后退导航
  useEffect(() => {
    const handlePopState = () => {
      // 当用户使用浏览器前进/后退时，重置到首页状态
      setViewMode('home');
      setSelectedArticleId(null);
      setSearchQuery('');
      setSelectedTag('');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 筛选后的文章
  const filteredArticles = React.useMemo(() => {
    let result = articles;
    
    // 按标签筛选
    if (selectedTag) {
      result = filterArticlesByTag(result, selectedTag);
    }
    
    // 按搜索关键词筛选
    if (searchQuery) {
      result = searchArticles(result, searchQuery);
    }
    
    return result;
  }, [articles, selectedTag, searchQuery]);

  // 所有可用标签
  const availableTags = React.useMemo(() => getAllTags(articles), [articles]);

  // 选中的文章
  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  // 处理文章选择
  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    setViewMode('article');
  };

  // 返回主页
  const handleBackToHome = () => {
    setViewMode('home');
    setSelectedArticleId(null);
    setSearchQuery('');
    setSelectedTag('');
    history.pushState({ viewMode: 'home' }, '', '/');
  };

  // 切换到文章列表视图
  const handleShowArticles = () => {
    setViewMode('articles');
    setSelectedArticleId(null);
    history.pushState({ viewMode: 'articles' }, '', '/articles');
  };

  // 处理 Footer 导航
  const handleNavigate = (path: string) => {
    if (path === '/') {
      handleBackToHome();
    } else if (path === '/public/articles') {
      handleShowArticles();
    } else {
      // 对于其他路径，使用默认浏览器导航
      window.location.href = path;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <ReadingProgress />
      <Header 
        onHomeClick={handleBackToHome}
        showHomeButton={viewMode !== 'home'}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        {viewMode === 'home' && (
          <Home 
            articles={articles} 
            onSelectArticle={handleSelectArticle}
          />
        )}

        {viewMode === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 搜索和文章列表 */}
            <div className="lg:col-span-3">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedTag={selectedTag}
                onTagChange={setSelectedTag}
                availableTags={availableTags}
              />
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-20">
                <ArticleList
                  articles={filteredArticles}
                  selectedArticleId={selectedArticleId || undefined}
                  onSelectArticle={handleSelectArticle}
                />
              </div>
            </aside>

            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm p-8 text-center border border-border">
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl mb-4 text-foreground">选择一篇文章</h2>
                  <p className="text-muted-foreground mb-6">
                    从左侧列表中选择文章开始阅读
                  </p>
                  <button
                    onClick={handleBackToHome}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                  >
                    返回主页
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'article' && selectedArticle && (
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
            {/* 文章列表侧边栏（桌面端） - 固定位置 */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedTag={selectedTag}
                  onTagChange={setSelectedTag}
                  availableTags={availableTags}
                />
                <div className="max-h-[calc(100vh-16rem)] overflow-y-auto rounded-lg border border-border bg-card p-4">
                  <ArticleList
                    articles={filteredArticles}
                    selectedArticleId={selectedArticleId || undefined}
                    onSelectArticle={handleSelectArticle}
                  />
                </div>
              </div>
            </aside>

            {/* 文章内容 */}
            <div className="pb-16">
              <ArticleView
                article={selectedArticle}
                onBack={handleBackToHome}
              />
            </div>
          </div>
        )}
      </main>

      <ScrollToTop />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BlogContent />
    </ThemeProvider>
  );
}