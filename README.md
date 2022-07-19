# Vite 项目信息插件

这是一个可用在 Console 中输出项目信息的 Vite 插件。
项目信息包含：

- 项目版本，对应 package.json version 字段
- 项目名称，对应 package.json name 字段
- 仓库链接, 对应 package.json repository.url 字段
- 项目负责人，对应 package.json author 字段
- 项目构建时间

如下使用即可在 Console 中输出项目信息，无需其他配置。

```js
// vite.config.js
import { defineConfig } from 'vite';
import projectInfoPlugin from 'vite-plugin-project-info';

export default defineConfig({
  plugins: [projectInfoPlugin()],
});
```

### 插件选项

- entry
  默认值为 `path.resolve('src/main')`，文件后缀兼容 js、jsx、ts 和 tsx 四种。
  如果 js 的入口文件变更，可以修改此配置。

### 其他使用方式

如果需要使用到项目信息，可以如下 import 进来：

```jsx
import projectInfo from 'virtual:version';
```
