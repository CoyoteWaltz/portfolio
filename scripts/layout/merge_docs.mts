import { fs } from 'zx'
import { META_FILE_NAME, SITE_DOC_PATH, TARGET_PAGE_PATH } from './constants.mjs'
import { awaitPromiseArr } from './await.mjs'
import { writeFinalJSON } from './file_manage/write.mjs'
import { copyDirectoryFiles } from './file_manage/copy.mjs'

export async function moveSiteDocs() {
  // copy 所有文件 到 pages/ 除了 _meta.json
  // merge meta 信息到 pages/_meta.json
  const docSiteMetaPath = `${SITE_DOC_PATH}/${META_FILE_NAME}`
  const [pageMeta, siteMeta, _] = await awaitPromiseArr([
    fs.readFile(`${TARGET_PAGE_PATH}/${META_FILE_NAME}`),
    fs.readFile(docSiteMetaPath),
    copyDirectoryFiles(SITE_DOC_PATH, TARGET_PAGE_PATH, {
      globOptions: {
        ignore: [docSiteMetaPath],
      },
      moveOptions: {
        overwrite: true,
      },
    }),
  ])
  const pageMetaJSON = JSON.parse(pageMeta.toString().trim() || '{}')
  const siteMetaJSON = JSON.parse(siteMeta.toString().trim() || '{}')
  const finalMetaJSON = {
    ...pageMetaJSON,
    ...siteMetaJSON,
  }
  return writeFinalJSON(finalMetaJSON)
}
