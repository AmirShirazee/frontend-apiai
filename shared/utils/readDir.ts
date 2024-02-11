import fs from "fs";
import { promisify } from "util";

const readdirAsync = promisify(fs.readdir);

export default async function readDir(tempDir: string): Promise<string[]> {
  return await readdirAsync(tempDir);
}
