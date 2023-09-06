import { fs } from 'zx'
import { SITE_DOC_PATH, TEMP_REPO_PATH } from './constants.mjs'
import { awaitPromiseArr } from './await.mjs'
import { infoLog, successLog } from './logger.mjs'

export async function cleanup() {
  infoLog('Cleaning up dirs...')
  await awaitPromiseArr([
    fs.remove(TEMP_REPO_PATH),
    fs.remove(SITE_DOC_PATH),
    fs.remove('./pages'),
  ])
  await fs.ensureDir('./pages')
  successLog('Cleaning up Done')
}
