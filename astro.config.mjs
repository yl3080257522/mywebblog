import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// 网站域名
export default defineConfig({
  site: 'https://rstudyhub.online',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    // 构建时自动生成 sitemap-index.xml（列出全站可收录页面）
    sitemap(),
  ],
});
