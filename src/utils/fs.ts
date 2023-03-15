import { readTextFile, BaseDirectory, exists, writeFile, createDir } from '@tauri-apps/api/fs';

const fileName = 'drunk.md';
const dir = 'markdown/';
const fullPath = dir + fileName;

export const saveContent = async (content: string) => {
  writeFile(fullPath, content, { dir: BaseDirectory.AppData })
    .then()
    .catch(e => console.warn('error', e));
}

export const readDefaultContent = async () => {
  const exist = await exists(fullPath, { dir: BaseDirectory.AppData });
  if (exist) {
    const content = await readTextFile(fullPath, { dir: BaseDirectory.AppData });
    return content;
  } else {
    createDir(dir, { dir: BaseDirectory.AppData, recursive: true });
    return ''
  }
}