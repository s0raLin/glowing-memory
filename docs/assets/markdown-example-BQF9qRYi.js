const n=`---
title: Markdown 完整示例
date: 2026-01-02
tags: ["Markdown", "教程", "示例"]
description: 展示 Markdown 的各种语法特性，包括标题、列表、代码块、表格等
readTime: 5 分钟
---

# Markdown 完整示例

## 欢迎来到我的博客！

这是一篇完整的 Markdown 示例文章，展示了各种 Markdown 语法特性。

### 文本格式

这是**粗体文本**，这是*斜体文本*，这是~~删除线文本~~。

你可以使用 ==高亮文本== 来强调重要内容（需要支持扩展语法）。

### 列表

#### 无序列表

- 第一项
- 第二项
  - 嵌套项 1
  - 嵌套项 2
- 第三项

#### 有序列表

1. 第一步
2. 第二步
3. 第三步

#### 任务列表

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个任务

### 代码示例

#### 行内代码

使用 \`console.log()\` 可以在控制台输出信息。

#### JavaScript 代码块

\`\`\`javascript
// 这是一个简单的 JavaScript 函数
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');

// 使用箭头函数
const add = (a, b) => a + b;
console.log(add(2, 3)); // 输出: 5
\`\`\`

#### Python 代码块

\`\`\`python
# Python 示例代码
def fibonacci(n):
    """计算斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 打印前10个斐波那契数
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
\`\`\`

#### TypeScript 代码块

\`\`\`typescript
// TypeScript 接口定义
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用
const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com"
};
\`\`\`

### 引用

> 这是一段引用文本。
> 
> 引用可以包含多个段落。
> 
> — 作者名字

### 链接和图片

这是一个 [链接示例](https://example.com)。

### 表格

| 特性 | 支持程度 | 说明 |
|------|---------|------|
| 代码高亮 | ✅ | 支持多种编程语言 |
| 表格 | ✅ | GFM 扩展语法 |
| 任务列表 | ✅ | 方便管理待办事项 |
| 数学公式 | ⚠️ | 需要额外插件 |

### 分割线

---

### 嵌套内容

1. 第一个列表项
   
   这是列表项的详细说明段落。
   
   \`\`\`javascript
   // 列表中的代码块
   const example = "示例代码";
   \`\`\`

2. 第二个列表项
   
   > 列表中的引用块
   
   - 嵌套的无序列表

### 总结

这篇文章展示了 Markdown 的主要语法特性：

- ✅ 标题和文本格式
- ✅ 列表和任务列表
- ✅ 代码块和语法高亮
- ✅ 表格
- ✅ 引用和链接

感谢阅读！
`;export{n as default};
