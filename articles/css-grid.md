---
title: CSS Grid 布局完全指南
date: 2025-12-30
tags: ["CSS", "Grid", "布局"]
description: CSS Grid 是一个强大的二维布局系统，本文将详细介绍其用法
readTime: 10 分钟
---

# CSS Grid 布局完全指南

## 什么是 CSS Grid？

CSS Grid 是一个基于网格的布局系统，可以同时处理行和列，使其成为创建复杂响应式布局的完美工具。

## 基础概念

### Grid Container 和 Grid Item

```css
/* Grid Container */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 20px;
}

/* Grid Items */
.item {
  background-color: #3498db;
  padding: 20px;
}
```

### 常用属性

#### Container 属性

```css
.grid-container {
  display: grid;
  
  /* 定义列 */
  grid-template-columns: repeat(3, 1fr);
  
  /* 定义行 */
  grid-template-rows: auto 200px auto;
  
  /* 间距 */
  gap: 20px;
  row-gap: 10px;
  column-gap: 15px;
  
  /* 对齐 */
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  align-content: space-around;
}
```

#### Item 属性

```css
.grid-item {
  /* 跨越列 */
  grid-column: 1 / 3;
  grid-column-start: 1;
  grid-column-end: 3;
  
  /* 跨越行 */
  grid-row: 1 / 4;
  
  /* 简写 */
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
```

## 实用示例

### 1. 响应式网格布局

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* 自动适应屏幕大小 */
```

### 2. 经典博客布局

```css
.blog-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 100px;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

### 3. 照片墙布局

```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 10px;
}

.photo-item:nth-child(3n) {
  grid-column: span 2;
  grid-row: span 2;
}
```

## Grid vs Flexbox

| 特性 | Grid | Flexbox |
|-----|---------|---------|
| 维度 | 二维（行和列） | 一维（行或列） |
| 用途 | 整体布局 | 组件内部布局 |
| 对齐 | 更强大的对齐选项 | 简单的对齐 |
| 浏览器支持 | 较新 | 更好 |

> **最佳实践**: Grid 用于整体页面布局，Flexbox 用于组件内部布局

## 浏览器兼容性

现代浏览器都已经很好地支持 CSS Grid：

- ✅ Chrome 57+
- ✅ Firefox 52+
- ✅ Safari 10.1+
- ✅ Edge 16+

## 实用工具

1. **Grid Garden** - 学习 Grid 的游戏
2. **Firefox DevTools** - 最好的 Grid 调试工具
3. **Grid.layoutit.com** - 可视化 Grid 生成器

## 总结

CSS Grid 是现代 CSS 布局的核心技术之一：

- 🎯 强大的二维布局系统
- 📱 完美支持响应式设计
- 🛠️ 简化复杂布局代码
- 🚀 提升开发效率

开始使用 Grid，让你的布局更简单、更强大！
