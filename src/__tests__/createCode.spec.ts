import { describe, it, expect } from 'vitest';
import fs from 'fs-extra';
import babel from '@babel/core';
import path from 'path';
import pkg from '../../package.json';
import createCode from '../createCode';

describe('createCode', () => {
  it('create code correctly', () => {
    const code = createCode();
    expect(code).toContain(`repository: '${pkg.repository.url}'`);
    expect(code).toContain(`version: '${pkg.version}'`);
    expect(code).toContain(`name: '${pkg.name}'`);
    expect(code).toContain(`author: '${pkg.author}'`);

    const tempFilePath = path.resolve(__dirname, 'clientOutput.js');
    const result = babel.transformSync(code, {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env'],
    });

    fs.writeFileSync(tempFilePath, result?.code || '', { encoding: 'utf-8' });
    const { author, name, version, repository, description } = require(tempFilePath).default;
    expect(repository).toEqual(pkg.repository.url);
    expect(version).toEqual(pkg.version);
    expect(name).toEqual(pkg.name);
    expect(author).toEqual(pkg.author);
    expect(description).toEqual('');
  });
});
