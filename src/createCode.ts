import path from 'path';
import moment from 'moment';
import fs from 'fs';
import { ProjectInfoPluginOptions } from '.';

export const DEFAULT_LOCALE = {
  projectVersion: '项目版本',
  buildTime: '构建时间',
  projectName: '项目名称',
  projectDescription: '项目描述',
  projectAuthor: '负 责 人',
  repositoryLink: '仓库链接',
};

export const EN_LOCALE = {
  projectVersion: 'ProjectVersion',
  buildTime: 'BuildTime',
  projectName: 'ProjectName',
  projectDescription: 'ProjectDescription',
  projectAuthor: 'ProjectAuthor',
  repositoryLink: 'RepositoryLink',
};

export function createCode(opts: { locale?: ProjectInfoPluginOptions['locale'] } = {}) {
  const { locale = DEFAULT_LOCALE } = opts;
  const packageJson = require(path.resolve('package.json'));
  let { repository } = packageJson;

  if (typeof repository === 'object') {
    packageJson.repository = repository.url;
  }

  packageJson.buildTime = moment().format('YYYY-MM-DD HH:mm:ss');

  let versionCode = fs.readFileSync(path.resolve(__dirname, './clientOutputTemplate.tpl'), { encoding: 'utf8' });
  const pkgMatchs = versionCode.match(/{pkg\.[^{}]*}/g);
  pkgMatchs?.forEach((m) => {
    const fieldName = m.match(/{pkg\.(.*)}/)?.[1];
    versionCode = versionCode.replace(new RegExp(m, 'g'), packageJson[fieldName || ''] || '');
  });

  const localeMatchs = versionCode.match(/{locale\.[^{}]*}/g);
  localeMatchs?.forEach((m) => {
    const localeFieldName = m.match(/{locale\.(.*)}/)?.[1];
    versionCode = versionCode.replace(new RegExp(m, 'g'), locale[localeFieldName] || '');
  });

  return versionCode;
}
