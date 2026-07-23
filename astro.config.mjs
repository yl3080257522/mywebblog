import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// 网站域名
export default defineConfig({
  site: 'https://rstudyhub.online',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
