import * as fs from 'fs';
import { promisify } from 'util';

const realPath = promisify(fs.realpath);

export async function fsCmp(...paths: string[]): Promise<boolean> {
  const subjects = await Promise.all(paths.map(ln => realPath(ln)));
  return subjects.every((f, i, arr) => arr[0] === f);
}

export default fsCmp;
