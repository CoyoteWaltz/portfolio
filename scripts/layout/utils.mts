import title from 'title'
import { $, fs, path } from 'zx'
import { TEMP_REPO_PATH } from './constants.mjs'
import { warnLog } from './logger.mjs'

export function pageTitleFromFilename(fileName: string) {
  return title(fileName.replace(/[-_]/g, ' '))
}

export function trimExtension(fileName: string) {
  const dotIndex = fileName.lastIndexOf('.')
  if (dotIndex === -1)
    return fileName

  return fileName.slice(0, dotIndex)
}

export async function isMdFile(pathName: string, exist = false) {
  const stat = await fs.stat(pathName)
  const fileExist = exist ? await fs.exists(pathName) : true
  if (fileExist && stat.isFile()) {
    const isMd = ['.md', '.mdx'].includes(path.extname(pathName))
    return isMd
  }
  return false
}

export async function getLatestGitCommitTimeStamp(filepath: string, parentDir?: string) {
  const relativeParentDir = path.resolve('.', parentDir)
  const changeDir = parentDir ? `${relativeParentDir}` : '.'
  const targetFilePath = parentDir ? `${path.join(relativeParentDir, '..', filepath)}` : filepath
  try {
    const res = await $`cd "${changeDir}" && git log -1 --format=%ct "${targetFilePath}"` // may not need xargs
    if (res.stderr)
      return 0
    return Number(res.stdout)
  }
  catch (error) {
    return 0
  }
}

export async function findFirstMdFile(dirName: string, options?: {
  deepest?: boolean
  sortBy?: 'lastCommitTime'
}) {
  const { deepest, sortBy } = options || {}
  const useTraverse = !!sortBy
  const allFilePaths: string[] = []
  const find = async (pathname: string, traverse = false): Promise<string | undefined> => {
    try {
      const inner = await fs.readdir(pathname)
      for (const p of inner) {
        const full = path.join(pathname, p)
        const stat = await fs.stat(full)
        if (stat.isFile() && await isMdFile(full)) {
          allFilePaths.push(full)
          if (!traverse)
            return full
        }
        else if (stat.isDirectory()) {
          const result = await find(full, traverse)
          if (result)
            return result
        }
      }
    }
    catch (error) {
      warnLog(error)
    }
  }

  const result = await find(dirName, useTraverse)

  if (sortBy) {
    let topIndex = 0
    let topValue: number

    // find the one
    for (let i = 0; i < allFilePaths.length; ++i) {
      const filepath = allFilePaths[i]
      if (sortBy === 'lastCommitTime') {
        const currentValue = await getLatestGitCommitTimeStamp(filepath, TEMP_REPO_PATH)
        if ((topValue === undefined) || (topValue !== undefined && currentValue > topValue)) {
          topValue = currentValue
          topIndex = i
        }
      }
    }

    return allFilePaths[topIndex]
  }

  return result?.slice(dirName.length)
}
