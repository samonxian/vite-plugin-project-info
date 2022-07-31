/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';
import { buildPlugin } from 'vite-plugin-build';

export default defineConfig(() => {
  return {
    plugins: [
      buildPlugin({
        fileBuild: {
          ignoreInputs: [`**/*.spec.*`, '**/*.test.*', '**/*.d.ts', '**/__tests__'],
          emitDeclaration: true,
          esOutputDir: false,
          rollupOptionsOutput: {
            exports: 'default',
          },
        },
      }),
    ],
    test: {
      watch: false,
    },
  };
});
