import { describe, it, expect } from 'vitest';
import createCode from '../createCode';

describe('createCode', () => {
  it('create code correctly', () => {
    const code = createCode();
    expect(code).toContain("repository: 'https://github.com/samonxian/vite-plugin-project-info'");
    expect(code).toContain("version: '0.1.0'");
    expect(code).toContain("name: 'vite-plugin-project-info'");
    expect(code).toMatchSnapshot(code);
  });
});
