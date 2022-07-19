import { PluginOption } from 'vite';
import path from 'path';
import createCode from './createCode';

export interface Options {
  entry?: string;
}
export default function versionPlugin(opts: Options = {}): PluginOption {
  const { entry = path.resolve('src/main') } = opts;
  const lastEntry = entry.split('.')[0];
  const virtualModuleId = 'virtual:version';
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
        return createCode();
      }
    },
    transform(code, id) {
      if (id.includes(path.resolve(lastEntry))) {
        return {
          code: `import 'virtual:version';\n${code}`,
          map: this.getCombinedSourcemap(),
        };
      }
    },
  };
}
