import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import rimraf = require('rimraf');

import { fsCmp } from '../src';

const rimrafAsync = promisify(rimraf);
const mkdtemp = promisify(fs.mkdtemp);
const mkdir = promisify(fs.mkdir);
const symlink = promisify(fs.symlink);
const writeFile = promisify(fs.writeFile);

const withTempdir = async (fn: (dir: string) => Promise<void>) => {
  const name = path.join(os.tmpdir(), 'test');
  const dir = await mkdtemp(name);
  try {
    await fn(dir);
  } finally {
    await rimrafAsync(dir);
  }
};

describe('fcCmp', () => {
  test('should yield true when comparing a directory and a symbolic link', () => {
    return withTempdir(async dir => {
      const dirPath = path.join(dir, 'foo');
      const symlinkPath = path.join(dir, 'foolink');
      await mkdir(dirPath);
      await symlink(dirPath, symlinkPath);

      expect(await fsCmp(dirPath, symlinkPath)).toBe(true);
    });
  });

  test('should yield true when comparing a file and 2 nested symbolic links', () => {
    return withTempdir(async dir => {
      const filePath = path.join(dir, 'file');
      const symlinkPath = path.join(dir, 'filelink');
      const nestedSymlinkPath = path.join(dir, 'nestedfilelink');
      await writeFile(filePath, 'content');
      await symlink(filePath, symlinkPath);
      await symlink(symlinkPath, nestedSymlinkPath);

      expect(await fsCmp(filePath, symlinkPath, nestedSymlinkPath)).toBe(true);
    });
  });

  test('should yield false for completely separate files', () => {
    return withTempdir(async dir => {
      const file1Path = path.join(dir, 'file1');
      const file2Path = path.join(dir, 'file2');
      await writeFile(file1Path, 'blah');
      await writeFile(file2Path, 'blahblah');

      expect(await fsCmp(file1Path, file2Path)).toBe(false);
    });
  });
});
