import { fs } from 'zx'

export async function beforeStart() {
  await fs.ensureDir('./pages')
}
