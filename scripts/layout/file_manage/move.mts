import { fs, glob, path } from 'zx'
import { TARGET_PAGE_PATH, TEMP_REPO_PATH } from '../constants.mjs'
import type { MenuConfigValue } from '../menus.mjs'
import { MENU_CONFIG, TARGET_DIRECTORIES } from '../menus.mjs'
import { errorLog, infoLog, successLog } from '../logger.mjs'

/**
 * { [metaKey]: 'path/in/TEMP_REPO_PATH' }
 */
export type MovingRecord = Record<MenuConfigValue['metaKey'], {
  src: string
  destDir: string
}>

export function getFileMoveRecord(): MovingRecord {
  const record: MovingRecord = {}
  TARGET_DIRECTORIES.forEach((name) => {
    const config = MENU_CONFIG[name]
    if (!config)
      return

    // 如果是 menu or page 模式 copy 所有 dir/files 到 pages/
    if ('menu' in config) {
      record[config.metaKey] = {
        src: path.join(TEMP_REPO_PATH, name),
        destDir: TARGET_PAGE_PATH,
      }
    }

    if ('page' in config) {
      const destDir = path.join(TARGET_PAGE_PATH, config.metaKey)
      record[config.metaKey] = {
        src: path.join(TEMP_REPO_PATH, name),
        destDir,
      }
    }
  })
  return record
}

export async function moveSingleFile(src: string, dest: string) {
  try {
    await fs.move(src, dest)
    successLog('moving file::success', src, 'to', dest)
  }
  catch (error) {
    errorLog(
      'moving file::',
      src, 'to', dest,
      error,
    )
    throw error
  }
}

export async function moveDirectFiles(dirPath: string, dest: string) {
  const allFiles = await glob(`${dirPath}/**/*`)
  return Promise.all(allFiles.map(async (file) => {
    const fileDest = path.join(dest, file.slice(dirPath.length))
    try {
      await moveSingleFile(file, fileDest)
    }
    catch (error) {
    }
  }))
}

export async function moveFiles(record: MovingRecord) {
  const allTasks = Object.entries(record).map(async ([metaKey, { src: srcPath, destDir }]) => {
    infoLog(
      'moving files::', metaKey,
    )

    const isSrcDir = (await fs.stat(srcPath)).isDirectory()
    if (isSrcDir) {
      await moveDirectFiles(srcPath, destDir)
    }
    else {
      // 单独移动文件
      const lastPath = srcPath.split(path.sep).find((_, idx, arr) => !arr[idx + 1])
      const dest = path.join(destDir, lastPath)
      try {
        await moveSingleFile(srcPath, dest)
      }
      catch (error) {

      }
    }
  })
  await Promise.all(allTasks)
}
