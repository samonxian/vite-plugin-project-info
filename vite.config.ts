/// <reference types="vitest" />

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
            exports: 'auto',
          },
        },
      }),
    ],
    test: {
      watch: false,
    },
  };
});
