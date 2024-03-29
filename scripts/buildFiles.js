const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');
const srcDir = path.resolve(__dirname, '../src');
const libDir = path.resolve(__dirname, '../lib');
// 所有 src 文件夹包括子文件夹的 js、ts、jsx、tsx 文件路径数组
const srcFilePaths = getTargetDirFilePaths(srcDir);

fs.ensureDir(libDir);
fs.copy(path.resolve(srcDir, 'clientOutputTemplate.tpl'), path.resolve(libDir, 'clientOutputTemplate.tpl'));

srcFilePaths.forEach((file) => {
  const fileRelativePath = path.relative(srcDir, file);
  spawn(
    'npm',
    ['run', 'vite', '--', 'build', '--mode', fileRelativePath, '--outDir', 'lib', '--config', './vite.config.ts'],
    {
      stdio: 'inherit',
    },
  );
});

/**
 * 获取 src 文件夹下的所有文件
 * @param {String} [targetDirPath] 目标文件夹路径
 * @return {Array} 文件列表数组
 */
function getTargetDirFilePaths(targetDirPath = path.resolve(__dirname, '../src')) {
  let fileList = [];

  fs.readdirSync(targetDirPath).forEach((file) => {
    const filePath = path.resolve(targetDirPath, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    if (isDirectory) {
      fileList = fileList.concat(getTargetDirFilePaths(filePath));
    } else {
      fileList.push(filePath);
    }
  });

  return fileList
    .filter((f) => {
      if (/__tests__/.test(f)) {
        return false;
      }
      if (/\.d\.ts/.test(f)) {
        return false;
      }

      if (/\.[jt]?sx?$/.test(f)) {
        return true;
      }

      return false;
    })
    .map((f) =>
      // 兼容 windows 路径
      f.replace(/\\/g, '/'),
    );
}
