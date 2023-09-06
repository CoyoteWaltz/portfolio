import { TEMP_REPO_PATH } from '../constants.mjs'
import { infoLog } from '../logger.mjs'

export async function cloneRepo() {
  infoLog('Clone Repo Start...')
  await $`pwd`
  await $`git clone git@github.com:CoyoteWaltz/MarkdownNotes.git --depth 1 --branch master --single-branch ${TEMP_REPO_PATH}`
  infoLog('Clone Repo End')
}
