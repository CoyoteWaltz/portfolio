import { fs, path } from 'zx'
import type { MenuSubItem, MetaPageItem } from '../typings/meta'
import { pageTitleFromFilename } from './utils.mjs'

export function getItems(dirPath: string): {
  menuItems: MenuSubItem
  flatItems: Record<string, MetaPageItem>
} {
  const inner = fs.readdirSync(dirPath)
  console.log(inner)
  const menuItems: MenuSubItem = {}
  const flatItems: Record<string, MetaPageItem> = {}
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
    // const stats = fs.statSync(subjectPath)
    const meta: MenuSubItem[''] = {
      title: pageTitleFromFilename(subject), // find title
      href: `/${subject}`,
    }
    menuItems[subject] = meta
    flatItems[subject] = {
      title: meta.title,
      // 一些基础配置 可补充
      display: 'hidden',
      type: 'page',
      theme: {
        toc: true,
        breadcrumb: false,
      },
    }
  })

  return {
    menuItems,
    flatItems,
  }
}
