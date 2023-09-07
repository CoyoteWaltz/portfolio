import { fs } from 'zx'
import { META_FILE_NAME, TARGET_PAGE_PATH } from '../constants.mjs'

export async function writeFile(content: string, dest: string) {
  return fs.writeFile(dest, content)
}

export async function writeFinalJSON<T>(json: T) {
  return writeFile(JSON.stringify(json, null, 2), `${TARGET_PAGE_PATH}/${META_FILE_NAME}`)
}
