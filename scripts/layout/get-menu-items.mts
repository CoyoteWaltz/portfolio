import { fs, path } from 'zx'
import type { MenuSubItem } from '../typings/meta'
import { pageTitleFromFilename } from './utils.mjs'

export function getItems(dirPath: string): MenuSubItem {
  const inner = fs.readdirSync(dirPath)
  console.log(inner)
  const result: MenuSubItem = {}
  const filtered = inner.filter((name) => {
    const fullPath = path.join(dirPath, name)
    const stats = fs.statSync(fullPath)
    if (stats.isDirectory())
      return true

    const ext = path.extname(fullPath)
    if (['md', 'mdx'].includes(ext))
      return true

    return false
  })
  filtered.forEach((subject) => {
    console.log('subject', subject)
    const subjectPath = path.join(dirPath, subject)
    const stats = fs.statSync(subjectPath)
    const meta: MenuSubItem[''] = {
      title: pageTitleFromFilename(subject), // find title
      href: `/${subject}`,
    }
    result[subject] = meta
  })

  return result
}
