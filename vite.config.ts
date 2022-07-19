/// <reference types="vitest" />

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      rollupOptions: {
        external: () => true,
        output: [
          {
            file: `lib/${mode.replace(/\.[jt]?sx?$/, '.js')}`,
            indent: false,
            exports: 'named',
            format: 'cjs',
            dir: undefined,
          },
        ],
      },
      lib: {
        // mode 特殊处理为文件名
        entry: path.resolve(__dirname, 'src', mode),
        name: 'noop', // 这里设置只有在 UMD 格式才有效，避免验证报错才设置的，在这里没用
      },
      minify: false,
    },
    test: {
      watch: false,
    },
  };
});
