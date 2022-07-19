import path from 'path';
import moment from 'moment';
import fs from 'fs';

export default function createCode() {
  const packageJson = require(path.resolve('package.json'));
  let { repository } = packageJson;

  if (typeof repository === 'object') {
    packageJson.repository = repository.url;
  }

  packageJson.buildTime = moment().format('YYYY-MM-DD HH:mm:ss');

  let versionCode = fs.readFileSync(path.resolve(__dirname, './clientOutputTemplate.tpl'), { encoding: 'utf8' });
  const matchs = versionCode.match(/{pkg\.[^{}]*}/g);
  matchs?.forEach((m) => {
    const fieldName = m.match(/{pkg\.(.*)}/)?.[1];
    versionCode = versionCode.replace(new RegExp(m, 'g'), packageJson[fieldName || ''] || '');
  });

  return versionCode;
}
