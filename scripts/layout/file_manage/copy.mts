import { fs, glob, path } from 'zx'
import { errorLog, successLog } from '../logger.mjs'

export async function copySingleFile(src: string, dest: string, options?: Parameters<typeof fs.copy>[2]) {
  try {
    await fs.copy(src, dest, options)
    successLog('Copy file::Success', src, 'to', dest)
  }
  catch (error) {
    errorLog(
      'Copy file::Error',
      src, 'to', dest,
      error,
    )
    throw error
  }
}

export async function copyDirectoryFiles(dirPath: string, dest: string, options?: {
  globOptions?: Parameters<typeof glob>[1]
  moveOptions?: Parameters<typeof copySingleFile>[2]
}) {
  const allFiles = await glob(`${dirPath}/**/*`, options?.globOptions)
  console.log('allFiles', allFiles)

  return Promise.all(allFiles.map(async (file) => {
    const fileDest = path.join(dest, file.slice(dirPath.length))
    try {
      await copySingleFile(file, fileDest, options?.moveOptions)
    }
    catch (error) {
    }
  }))
}
