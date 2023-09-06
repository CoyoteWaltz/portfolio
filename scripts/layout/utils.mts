import title from 'title'
import { fs, path } from 'zx'

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

export async function findFirstMdFile(dirName: string) {
  const find = async (pathname: string): Promise<string | undefined> => {
    const inner = await fs.readdir(pathname)
    for (const p of inner) {
      const full = path.join(pathname, p)
      const stat = await fs.stat(full)
      if (stat.isFile() && await isMdFile(full)) {
        return full
      }
      else if (stat.isDirectory()) {
        const result = await find(full)
        if (result)
          return result
      }
    }
  }
  return (await find(dirName)).slice(dirName.length)
}
