import { path } from 'zx'
import type { ReplaceInFileConfig } from 'replace-in-file'
import replace from 'replace-in-file'
import { TARGET_DIRECTORIES } from '../menus.mjs'
import { TEMP_REPO_PATH } from '../constants.mjs'
import { awaitPromiseArr } from '../await.mjs'
import { infoLog } from '../logger.mjs'

export async function modifyFiles() {
  infoLog('Start File Modify')
  // 处理 menus 路径
  await awaitPromiseArr(
    TARGET_DIRECTORIES.map(async (name, idx, arr) => {
      const otherMenuNames = arr.filter(v => v !== name)
      const fullGlobPath = path.join(TEMP_REPO_PATH, name, '**', '*.md')

      const config: ReplaceInFileConfig = {
        files: fullGlobPath,
        // dry: true, // for debug
        ignore: ['_imgs/**'],
        from: /\(([^)]+)\)/g,
        // from: otherMenuNames.map(v => new RegExp('\(([^)]+)\)', 'g')),
        to: (match, file) => {
          // get string with ()
          // remove all
          const targetMenuName = otherMenuNames.find(v => match.includes(v))
          if (targetMenuName === undefined)
            // not found
            return match
          const index = match.indexOf(targetMenuName)
          // get final path: '(' + content
          // content: ../../02learning_notes/xxxx -> xxxx
          return match.slice(0, 1) + match.slice(index + targetMenuName.length + 1)
        },
        countMatches: true,
      }
      //   // 将文件内容中 其他 path 改成目标路径
      //   // 比如 在 02learning_notes 的所有 md 文件内容 都需要去掉 08reading(除了自己路径的 path)
      //   // 因为这些 menus 的路径会被处理到第一层
      const results = await replace.replaceInFile(config)
      infoLog('File Changed >>>>', ...results.filter(v => v.hasChanged))
    }))
}
