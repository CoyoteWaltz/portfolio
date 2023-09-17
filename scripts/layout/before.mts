import { fs } from 'zx'
import { TARGET_PAGE_PATH } from './constants.mjs'

export async function beforeStart() {
  await fs.remove(TARGET_PAGE_PATH)
  await fs.ensureDir(TARGET_PAGE_PATH)
}
