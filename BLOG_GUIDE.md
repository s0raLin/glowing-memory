# 博客系统使用指南

这是一个功能完善的个人博客系统，基于 React + TypeScript + Vite 构建，支持动态加载 Markdown 文章。

## 🎯 主要功能

### ✅ 已实现的功能

1. **动态文章加载**
   - 从 `/public/articles/` 目录自动加载所有 `.md` 文件
   - 支持 Frontmatter 元数据（标题、日期、标签、描述等）
   - 文章按日期自动排序

2. **精美的主页**
   - 展示最新文章
   - 显示热门标签
   - 统计信息展示
   - 响应式设计

3. **文章阅读功能**
   - 完整的 Markdown 渲染
   - 代码语法高亮（支持多种编程语言）
   - 响应式文章布局
   - 阅读进度条

4. **搜索和筛选**
   - 全文搜索（标题、描述、内容）
   - 标签筛选
   - 实时搜索结果

5. **主题切换**
   - 夜间模式 / 白天模式
   - 流畅的过渡动画
   - 自动保存用户偏好

6. **用户体验优化**
   - 返回顶部按钮
   - 阅读进度指示器
   - 加载状态显示
   - 响应式设计
   - 平滑滚动

## 📝 如何添加新文章

### 方法一：直接创建 Markdown 文件

1. 在 `/public/articles/` 目录下创建新的 `.md` 文件
2. 文件名建议使用英文，用连字符分隔（例如：`my-new-article.md`）
3. 添加 Frontmatter 元数据和内容

### 文章模板

```markdown
---
title: 文章标题
date: 2026-01-03
tags: ["标签1", "标签2"]
description: 文章简短描述
readTime: 5 分钟
---

# 文章标题

文章内容从这里开始...
```

### Frontmatter 字段说明

- `title`: 文章标题（必需）
- `date`: 发布日期，格式为 YYYY-MM-DD（必需）
- `tags`: 标签数组，JSON 格式：`["tag1", "tag2"]`（必需）
- `description`: 文章简短描述（必需）
- `readTime`: 预估阅读时间（必需）

## 🎨 支持的 Markdown 语法

### 基础语法
- 标题（H1-H6）
- **粗体**、*斜体*、~~删除线~~
- 链接和图片
- 引用块
- 有序列表和无序列表
- 任务列表：`- [x]` 和 `- [ ]`
- 水平分割线

### 扩展语法
- 表格
- 代码块（带语法高亮）
- GFM 扩展
- HTML（通过 rehype-raw）

### 代码高亮

支持的语言包括但不限于：
- JavaScript
- TypeScript
- Python
- CSS
- HTML
- JSON
- Markdown
- Bash
- 等等...

示例：
````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

## 🚀 项目结构

```
├── public/
│   └── articles/              # Markdown 文章目录
│       ├── markdown-example.md
│       ├── react-hooks.md
│       ├── css-grid.md
│       └── README.md
├── src/
│   ├── app/
│   │   ├── components/        # React 组件
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── ArticleList.tsx
│   │   │   ├── ArticleView.tsx
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── ReadingProgress.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── Footer.tsx
│   │   ├── utils/             # 工具函数
│   │   │   └── articleLoader.ts
│   │   └── App.tsx            # 主应用组件
│   └── styles/                # 样式文件
│       ├── index.css
│       ├── tailwind.css
│       ├── theme.css
│       └── markdown.css
└── package.json
```

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **react-markdown** - Markdown 渲染
- **remark-gfm** - GitHub Flavored Markdown
- **rehype-raw** - HTML 支持
- **react-syntax-highlighter** - 代码高亮
- **lucide-react** - 图标库

## 📋 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 🎨 自定义

### 修改主题颜色
编辑 `/src/styles/theme.css` 文件中的 CSS 变量

### 修改博客标题
编辑 `/src/app/components/Header.tsx` 文件

### 修改首页内容
编辑 `/src/app/components/Home.tsx` 文件

### 修改页脚信息
编辑 `/src/app/components/Footer.tsx` 文件

## 📚 示例文章

系统预置了几篇示例文章：
1. **Markdown 完整示例** - 展示所有 Markdown 语法
2. **React Hooks 深入理解** - React Hooks 教程
3. **CSS Grid 布局完全指南** - CSS Grid 使用指南
4. **TypeScript 最佳实践** - TypeScript 开发建议
5. **Web 性能优化实战** - 前端性能优化技巧

## 💡 使用技巧

1. **文章组织**：使用描述性的文件名和合适的标签
2. **代码高亮**：在代码块中指定语言以获得语法高亮
3. **图片优化**：使用适当大小的图片以提升加载速度
4. **内容结构**：使用清晰的标题层级组织内容
5. **标签管理**：使用一致的标签命名，便于文章分类

## 🔧 常见问题

### 文章没有显示？
- 检查文件是否在 `/public/articles/` 目录下
- 确认文件扩展名为 `.md`
- 验证 Frontmatter 格式是否正确

### 代码高亮不工作？
- 确保在代码块标记后指定了语言
- 例如：```javascript 而不是 ```

### 样式显示异常？
- 清除浏览器缓存
- 检查是否正确导入了样式文件

## 📝 更新日志

### v1.0.0 (2026-01-03)
- ✅ 初始版本发布
- ✅ 动态文章加载系统
- ✅ 主页和文章详情页
- ✅ 搜索和筛选功能
- ✅ 主题切换功能
- ✅ 阅读进度和返回顶部
- ✅ 完整的 Markdown 支持
- ✅ 代码语法高亮
- ✅ 响应式设计

## 🤝 贡献

欢迎提交问题和改进建议！

## 📄 许可

MIT License

---

祝你使用愉快！如有问题，请参考示例文章或查看源代码。
