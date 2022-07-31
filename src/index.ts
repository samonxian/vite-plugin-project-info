import { PluginOption } from 'vite';
import path from 'path';
import { createCode } from './createCode';

export interface ProjectInfoPluginOptions {
  entry?: string;
  locale?: {
    projectVersion?: string;
    buildTime?: string;
    projectName?: string;
    projectDescription?: string;
    projectAuthor?: string;
    repositoryLink?: string;
  };
}

export default function projectInfoPlugin(opts: ProjectInfoPluginOptions = {}): PluginOption {
  const { entry = path.resolve('src/main'), locale } = opts;
  const lastEntry = entry.split('.')[0];
  const virtualModuleId = 'virtual:project-info';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite:project-info',
    enforce: 'pre',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return createCode({
          locale,
        });
      }
    },
    transform(code, id) {
      if (id.includes(path.resolve(lastEntry).replace(/\\/g, '/'))) {
        return {
          code: `import '${virtualModuleId}';\n${code}`,
          map: this.getCombinedSourcemap(),
        };
      }
    },
  };
}
