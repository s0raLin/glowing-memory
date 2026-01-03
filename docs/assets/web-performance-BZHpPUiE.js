const n=`---
title: Web 性能优化实战
date: 2025-12-25
tags: ["性能优化", "Web", "前端"]
description: 从多个维度优化 Web 应用性能，提升用户体验
readTime: 12 分钟
---

# Web 性能优化实战

性能优化是前端开发中非常重要的一环。一个快速响应的网站不仅能提供更好的用户体验，还能提高 SEO 排名和转化率。

## 为什么性能很重要？

研究表明：

- 📊 页面加载时间每增加 1 秒，转化率下降 7%
- 🚀 53% 的移动用户会放弃加载时间超过 3 秒的网站
- 💰 Amazon 发现每 100ms 的延迟会导致 1% 的销售损失

## 性能优化策略

### 1. 资源优化

#### 图片优化

\`\`\`html
<!-- 使用现代图片格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.avif" type="image/avif">
  <img src="image.jpg" alt="描述" loading="lazy">
</picture>

<!-- 响应式图片 -->
<img 
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  src="medium.jpg" 
  alt="描述"
>
\`\`\`

#### CSS 优化

\`\`\`css
/* 避免复杂选择器 */
/* ❌ 不好 */
body div.container ul li a.link span { }

/* ✅ 好 */
.nav-link-text { }

/* 使用 CSS 变量减少重复 */
:root {
  --primary-color: #3498db;
  --spacing: 1rem;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing);
}
\`\`\`

#### JavaScript 优化

\`\`\`javascript
// 代码分割 - 动态导入
const loadModule = async () => {
  const module = await import('./heavy-module.js');
  module.init();
};

// 防抖和节流
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 使用
const handleSearch = debounce((query) => {
  // 执行搜索
}, 300);
\`\`\`

### 2. 网络优化

#### 使用 CDN

\`\`\`html
<!-- 从 CDN 加载常用库 -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"><\/script>
\`\`\`

#### HTTP/2 和 HTTP/3

HTTP/2 的多路复用特性可以显著提升性能：

- 单个连接上的多个请求
- 服务器推送
- 头部压缩

#### 资源预加载

\`\`\`html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//api.example.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero-image.jpg" as="image">

<!-- 预获取下一页资源 -->
<link rel="prefetch" href="next-page.html">
\`\`\`

### 3. 渲染优化

#### 减少重排和重绘

\`\`\`javascript
// ❌ 不好 - 多次重排
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';

// ✅ 好 - 批量更新
element.style.cssText = 'width: 100px; height: 200px; margin: 10px;';

// 或使用 class
element.className = 'optimized-style';
\`\`\`

#### 使用 CSS 变换而不是位置属性

\`\`\`css
/* ❌ 不好 - 触发重排 */
.box {
  position: absolute;
  left: 100px;
  top: 100px;
}

/* ✅ 好 - 只触发合成 */
.box {
  transform: translate(100px, 100px);
  will-change: transform;
}
\`\`\`

#### 虚拟滚动

对于长列表，使用虚拟滚动只渲染可见项：

\`\`\`javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index]}
        </div>
      )}
    </FixedSizeList>
  );
}
\`\`\`

### 4. 缓存策略

#### Service Worker 缓存

\`\`\`javascript
// sw.js
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
\`\`\`

#### HTTP 缓存头

\`\`\`
# .htaccess 或服务器配置
# 静态资源缓存 1 年
<FilesMatch "\\.(jpg|jpeg|png|gif|svg|css|js|woff2)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# HTML 不缓存
<FilesMatch "\\.html$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
\`\`\`

### 5. 监控和测试

#### 性能监控 API

\`\`\`javascript
// Performance API
const perfData = window.performance.timing;
const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

console.log('Page load time:', pageLoadTime);

// Performance Observer
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.renderTime || entry.loadTime);
  }
});

observer.observe({ entryTypes: ['largest-contentful-paint'] });
\`\`\`

#### Web Vitals

\`\`\`javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);  // Cumulative Layout Shift
getFID(console.log);  // First Input Delay
getFCP(console.log);  // First Contentful Paint
getLCP(console.log);  // Largest Contentful Paint
getTTFB(console.log); // Time to First Byte
\`\`\`

## 性能优化清单

| 优化项 | 优先级 | 影响 |
|-------|-------|------|
| 压缩图片 | 🔴 高 | 减少带宽，加快加载 |
| 启用 Gzip/Brotli | 🔴 高 | 减小文件大小 |
| 代码分割 | 🔴 高 | 减少初始加载时间 |
| 使用 CDN | 🟡 中 | 降低延迟 |
| 懒加载 | 🟡 中 | 优化初始渲染 |
| 预加载关键资源 | 🟡 中 | 加快关键资源加载 |
| 优化字体加载 | 🟢 低 | 改善文本渲染 |

## 工具推荐

- **Lighthouse** - Google 的性能审计工具
- **WebPageTest** - 详细的性能分析
- **Chrome DevTools** - 性能分析和调试
- **webpack-bundle-analyzer** - 分析打包体积
- **ImageOptim** - 图片压缩工具

## 总结

性能优化是一个持续的过程：

1. 🎯 设定明确的性能目标
2. 📊 使用工具持续监控
3. 🔍 识别性能瓶颈
4. ⚡ 实施优化策略
5. 📈 测量优化效果

记住，最好的优化是不需要加载的资源！优先考虑真正需要的功能和资源。
`;export{n as default};
