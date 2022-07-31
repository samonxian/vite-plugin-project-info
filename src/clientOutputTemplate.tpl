const COLORS = {
  primary: '#1890ff',
  success: '#52c41a',
  info: '#13c2c2',
  danger: '#f5222d',
  // warning: '#fa8c16',
  // default: '#35495E',
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
    log('{locale.projectVersion}', '{pkg.version}', '#eb2f96');
    log('{locale.buildTime}', '{pkg.buildTime}', COLORS.danger);
    log('{locale.projectName}', '{pkg.name}', COLORS.primary);
    log('{locale.projectDescription}', '{pkg.description}', '#722ed1');
    log('{locale.repositoryLink}', '{pkg.repository}', COLORS.success);
    log('{locale.projectAuthor}', '{pkg.author}', COLORS.info);
  },
};

projectInfo.consoleLogProjectInfo();

export default projectInfo;
