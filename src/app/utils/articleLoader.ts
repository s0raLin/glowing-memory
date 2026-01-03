import type { Article } from '../components/ArticleList';

// 定义文章元数据接口
interface ArticleMetadata {
  title: string;
  date: string;
  tags: string[];
  description: string;
  readTime: string;
}

// 解析 frontmatter
function parseFrontmatter(content: string): { metadata: ArticleMetadata; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // 如果没有 frontmatter，返回默认值
    return {
      metadata: {
        title: '无标题',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        description: '',
        readTime: '未知'
      },
      content
    };
  }

  const frontmatterStr = match[1];
  const mainContent = match[2];

  // 解析 YAML 格式的 frontmatter
  const metadata: Partial<ArticleMetadata> = {};
  
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    if (key === 'tags') {
      // 解析数组格式 ["tag1", "tag2"]
      try {
        metadata.tags = JSON.parse(value);
      } catch {
        metadata.tags = [];
      }
    } else {
      (metadata as any)[key] = value;
    }
  });

  return {
    metadata: metadata as ArticleMetadata,
    content: mainContent
  };
}

// 从文件名生成 ID
function getIdFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9-]/g, '-');
}

// 动态加载所有文章
export async function loadArticles(): Promise<Article[]> {
  const articles: Article[] = [];

  // 使用 Vite 的 import.meta.glob 动态导入所有 markdown 文件
  const articleModules = import.meta.glob('/public/articles/*.md', { 
    query: '?raw',
    import: 'default'
  });

  for (const [path, importFn] of Object.entries(articleModules)) {
    try {
      const content = await importFn() as string;
      const filename = path.split('/').pop() || '';
      const { metadata, content: mainContent } = parseFrontmatter(content);

      articles.push({
        id: getIdFromFilename(filename),
        title: metadata.title,
        date: metadata.date,
        tags: metadata.tags,
        description: metadata.description,
        readTime: metadata.readTime,
        content: mainContent
      });
    } catch (error) {
      console.error(`Error loading article from ${path}:`, error);
    }
  }

  // 按日期降序排序（最新的文章在前面）
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

// 获取所有标签
export function getAllTags(articles: Article[]): string[] {
  const tagsSet = new Set<string>();
  articles.forEach(article => {
    article.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

// 按标签筛选文章
export function filterArticlesByTag(articles: Article[], tag: string): Article[] {
  if (!tag) return articles;
  return articles.filter(article => article.tags.includes(tag));
}

// 搜索文章
export function searchArticles(articles: Article[], query: string): Article[] {
  if (!query.trim()) return articles;
  
  const lowerQuery = query.toLowerCase();
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    article.content.toLowerCase().includes(lowerQuery)
  );
}
