# 知识专栏 · 个人博客

基于 [Astro](https://astro.build/) + Tailwind CSS 的静态个人博客。内容写在 `src/data/articles.ts`，构建后可直接部署到任意静态托管。

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:4321）
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 目录结构

```
src/
  data/articles.ts    # 文章与分类数据（新增文章改这里）
  pages/              # 路由页面
  layouts/Layout.astro
  styles/globals.css
public/               # 静态资源（favicon 等）
```

## 项目展示

首页「精选项目」使用 3D 轮播，数据在 `src/data/projects.ts`。修改标题、封面、链接后刷新即可。

打开 `src/data/articles.ts`，在 `articles` 数组中追加一项：

```ts
{
  slug: "my-new-post",          // URL: /blog/my-new-post
  title: "文章标题",
  excerpt: "摘要…",
  category: "技术随笔",         // 文献解读 | 项目实战 | 系统教程 | 技术随笔
  date: "2026-07-14",
  readTime: "8 分钟",
  tags: ["Astro", "博客"],
  cover: "https://example.com/cover.jpg",
  featured: false,              // true 会出现在首页「精选」
  content: `## 标题

正文支持简易 Markdown：标题、列表、代码块、加粗、行内代码、链接与 $$公式$$。`,
}
```

然后 `npm run dev` 刷新即可看到。

## 部署

`npm run build` 后，把 `dist/` 目录上传到 Vercel、Netlify、Cloudflare Pages 或任意静态服务器即可。
