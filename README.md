# Vite 项目信息插件

<img width="500" src="https://user-images.githubusercontent.com/1954171/182008160-4030aaf4-46e1-4e99-bace-d27ad9a48814.png"/>

这是一个可在浏览器 Console 中输出项目信息的 Vite 插件。
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

## 在线试用

[vite-plugin-project-info](https://stackblitz.com/edit/vite-plugin-project-info-b7hcru?file=vite.config.ts)

## virtual:project-info 模块代码

`pkg.xxx` 会替换为 `package.json` 的字段值。
下方的代码最终打包占用体积可忽略不计。

```js
const COLORS = {
  primary: '#1890ff',
  success: '#52c41a',
  info: '#13c2c2',
  danger: '#f5222d',
};
/**
 * 固定模板的 console.log 输出
 * @param title log的标题
 * @param description log的描述
 * @param color 颜色
 */
function log(title, description, color) {
  if (title && description) {
    console.log(
      `%c ${title} %c ${description} %c`,
      `background:${color};border:1px solid ${color}; padding: 5px; border-radius: 4px 0 0 4px; color: #fff;`,
      `border:1px solid ${color}; padding: 5px; border-radius: 0 4px 4px 0; color: ${color};`,
      'background:transparent',
    );
  }
}

const projectInfo = {
  name: '{pkg.name}',
  version: '{pkg.version}',
  description: '{pkg.description}',
  repository: '{pkg.repository}',
  author: '{pkg.author}',
  buildTime: '{pkg.buildTime}',
  consoleLogProjectInfo() {
    log('项目版本', '{pkg.version}', '#eb2f96');
    log('构建时间', '{pkg.buildTime}', COLORS.danger);
    log('项目名称', '{pkg.name}', COLORS.primary);
    log('项目描述', '{pkg.description}', '#722ed1');
    log('仓库链接', '{pkg.repository}', COLORS.success);
    log('负 责 人', '{pkg.author}', COLORS.info);
  },
};

projectInfo.consoleLogProjectInfo();

export default projectInfo;
```

## 插件选项

- **entry**

  默认值为 `path.resolve('src/main')`，文件后缀兼容 js、jsx、ts 和 tsx 四种。
  如果 js 的入口文件变更，可以修改此配置。

## 其他使用方式

如果需要使用到项目信息，可以如下 import 进来：

```jsx
import projectInfo from 'virtual:project-info';
```
