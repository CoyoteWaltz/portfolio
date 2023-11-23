import { fs, path } from 'zx'
import type { MenuSubItem, MetaPageItem } from '../../typings/meta'
import { findFirstMdFile, pageTitleFromFilename, trimExtension } from '../utils.mjs'
import { awaitPromiseArr } from '../await.mjs'
import { successLog } from '../logger.mjs'

export async function getItems(dirPath: string): Promise<{
  menuItems: MenuSubItem
  flatItems: Record<string, MetaPageItem>
}> {
  const menuItems: MenuSubItem = {}
  const flatItems: Record<string, MetaPageItem> = {}

  const inner = await fs.readdir(dirPath)
  const filtered = (
    await awaitPromiseArr(
      inner.map(async (name) => {
        const fullPath = path.join(dirPath, name)
        const stats = await fs.stat(fullPath)
        if (stats.isDirectory())
          return [name, true] as const

        const ext = path.extname(fullPath)
        if (['.md', '.mdx'].includes(ext))
          return [name.slice(0, name.indexOf(ext)), false] as const

        return [''] as const
      }),
    )
  ).filter(v => !!v[0])

  await awaitPromiseArr(
    filtered.map(async ([subject, isDir]) => {
      const subjectPath = path.join(dirPath, subject)

      // 如果是目录 寻找到第一个 md 文件作为第一个路由
      let firstMd = ''
      if (isDir) {
        firstMd = await findFirstMdFile(subjectPath, {
          sortBy: 'lastCommitTime',
        })
        firstMd = trimExtension(firstMd)
      }

      successLog('subject', subject, 'firstMd>>>', firstMd)

      const meta: MenuSubItem[''] = {
        title: pageTitleFromFilename(subject), // find title
        href: `/${subject}${firstMd}`,
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
    }),
  )

  console.log({
    menuItems,
    flatItems,
  })

  return {
    menuItems,
    flatItems,
  }
}
