---
title: 使用指南
date: 2024-01-01
tags: ["指南", "文档"]
description: 博客文章格式和使用指南
readTime: 5 分钟
---

# 使用指南

这个目录用于存放博客文章的 Markdown 文件。

## 如何添加新文章

1. 在此目录下创建一个新的 `.md` 文件
2. 文件名建议使用英文，用连字符分隔，例如：`my-new-article.md`
3. 在文件开头添加 frontmatter 元数据
4. 编写文章内容

## 文章格式

每篇文章都应该包含以下 frontmatter 元数据：

```markdown
---
title: 文章标题
date: YYYY-MM-DD
tags: ["标签1", "标签2", "标签3"]
description: 文章简短描述
readTime: X 分钟
---

# 文章标题

文章内容从这里开始...
```

## Frontmatter 字段说明

- `title`: 文章标题（必需）
- `date`: 发布日期，格式为 YYYY-MM-DD（必需）
- `tags`: 标签数组，使用 JSON 数组格式（必需）
- `description`: 文章简短描述，会显示在文章列表中（必需）
- `readTime`: 预估阅读时间（必需）

## 支持的 Markdown 语法

本博客支持完整的 Markdown 语法和 GitHub Flavored Markdown (GFM) 扩展，包括：

- 标题、段落、换行
- **粗体**、*斜体*、~~删除线~~
- 列表（有序、无序、任务列表）
- 代码块（带语法高亮）
- 表格
- 引用
- 链接
- 水平分割线
- HTML（通过 rehype-raw）

## 代码高亮

支持多种编程语言的语法高亮：

```javascript
// JavaScript 示例
const greeting = "Hello, World!";
console.log(greeting);
```

```python
# Python 示例
def hello():
    print("Hello, World!")
```

```typescript
// TypeScript 示例
interface User {
  name: string;
  age: number;
}
```

## 示例文章

参考此目录中的现有文章：
- `markdown-example.md` - Markdown 语法示例
- `react-hooks.md` - React Hooks 教程
- `css-grid.md` - CSS Grid 布局指南
- `typescript-best-practices.md` - TypeScript 最佳实践
- `web-performance.md` - Web 性能优化

## 注意事项

1. 文件名不要包含空格，使用连字符（-）代替
2. 确保 frontmatter 格式正确，使用 `---` 包裹
3. tags 必须使用 JSON 数组格式：`["tag1", "tag2"]`
4. 日期格式必须是 `YYYY-MM-DD`
5. 文章会自动按日期降序排序（最新的在前面）

添加新文章后，刷新页面即可看到更新！
