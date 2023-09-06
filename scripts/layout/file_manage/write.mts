import { fs } from 'zx'
import { TARGET_PAGE_PATH } from '../constants.mjs'

export async function writeFile(content: string, dest: string) {
  return fs.writeFile(dest, content)
}

export async function writeFinalJSON<T>(json: T) {
  return writeFile(JSON.stringify(json, null, 2), `${TARGET_PAGE_PATH}/_meta.json`)
}
