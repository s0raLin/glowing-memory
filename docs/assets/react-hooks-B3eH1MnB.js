const n=`---
title: React Hooks 深入理解
date: 2026-01-01
tags: ["React", "Hooks", "JavaScript"]
description: 深入探讨 React Hooks 的原理和最佳实践
readTime: 8 分钟
---

# React Hooks 深入理解

## 什么是 Hooks？

React Hooks 是 React 16.8 引入的新特性，它允许你在不编写 class 的情况下使用 state 和其他 React 特性。

### 为什么需要 Hooks？

在 Hooks 出现之前，函数组件被称为"无状态组件"，只能接收 props 并返回 React 元素。如果需要状态管理或生命周期方法，就必须使用 class 组件。

Hooks 解决了以下问题：

1. **组件之间复用状态逻辑困难**
2. **复杂组件变得难以理解**
3. **难以理解的 class**

## 常用的 Hooks

### 1. useState

\`useState\` 是最基本的 Hook，用于在函数组件中添加状态。

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
\`\`\`

### 2. useEffect

\`useEffect\` 用于处理副作用，如数据获取、订阅或手动修改 DOM。

\`\`\`javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 数据获取
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));

    // 清理函数
    return () => {
      // 取消订阅或清理工作
    };
  }, [userId]); // 依赖数组

  return user ? <div>{user.name}</div> : <div>加载中...</div>;
}
\`\`\`

### 3. useContext

\`useContext\` 用于访问 React Context。

\`\`\`typescript
import { createContext, useContext } from 'react';

// 创建 Context
const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ 
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      主题按钮
    </button>
  );
}
\`\`\`

### 4. useCallback 和 useMemo

这两个 Hook 用于性能优化。

\`\`\`javascript
import { useState, useCallback, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  // useMemo 缓存计算结果
  const sortedItems = useMemo(() => {
    console.log('排序中...');
    return items.sort((a, b) => a - b);
  }, [items]);

  // useCallback 缓存函数
  const handleClick = useCallback(() => {
    console.log('点击了按钮');
  }, []);

  return (
    <div>
      {sortedItems.map(item => (
        <div key={item}>{item}</div>
      ))}
      <button onClick={handleClick}>点击</button>
    </div>
  );
}
\`\`\`

## 自定义 Hooks

自定义 Hook 是一个以 "use" 开头的 JavaScript 函数，可以调用其他 Hooks。

\`\`\`typescript
import { useState, useEffect } from 'react';

// 自定义 Hook：窗口大小
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 使用自定义 Hook
function MyComponent() {
  const { width, height } = useWindowSize();
  
  return <div>窗口大小: {width} x {height}</div>;
}
\`\`\`

## Hooks 规则

使用 Hooks 时必须遵循两个规则：

1. **只在顶层调用 Hooks**
   - ❌ 不要在循环、条件或嵌套函数中调用
   
2. **只在 React 函数中调用 Hooks**
   - ✅ 在函数组件中调用
   - ✅ 在自定义 Hook 中调用
   - ❌ 在普通 JavaScript 函数中调用

## 最佳实践

| 实践 | 说明 |
|-----|------|
| 合理使用依赖数组 | 确保 useEffect 的依赖数组包含所有使用到的外部变量 |
| 避免过度优化 | 不要过早使用 useMemo 和 useCallback |
| 提取自定义 Hooks | 将复杂逻辑提取为可复用的自定义 Hooks |
| 保持 Hooks 简单 | 每个 Hook 应该只做一件事 |

## 总结

React Hooks 是现代 React 开发的基石，掌握它们对于编写高质量的 React 应用至关重要。

- ✅ 理解基本 Hooks 的用法
- ✅ 学会编写自定义 Hooks
- ✅ 遵循 Hooks 规则
- ✅ 应用最佳实践

Happy coding! 🚀
`;export{n as default};
