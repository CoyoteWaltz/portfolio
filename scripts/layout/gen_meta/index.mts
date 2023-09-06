import type { MetaJSON, MetaMenuItem, MetaPageItem } from '../../typings/meta'
import { awaitPromiseArr } from '../await.mjs'
import { MENU_CONFIG, TARGET_DIRECTORIES } from '../menus.mjs'
import { getItems } from './get-menu-items.mjs'

const TEMP_REPO_PATH = './temp'

export async function getMetaJSON() {
  const finalMeta: MetaJSON = {}

  function addToMeta(key: string, data: (MetaJSON)[string]): MetaJSON
  function addToMeta(data: MetaJSON): MetaJSON
  function addToMeta(keyOrData: string | MetaJSON, data?: (MetaJSON)[string]) {
    if (typeof keyOrData === 'string')
      finalMeta[keyOrData] = structuredClone(data)
    else
      Object.assign(finalMeta, structuredClone(keyOrData))
    return finalMeta
  }

  // 处理第一层 navigation
  await awaitPromiseArr(
    TARGET_DIRECTORIES.map(async (dir) => {
      // find md/mdx files or directories inside the folder
      const dirPath = path.join(TEMP_REPO_PATH, dir)
      // fs.ensureDirSync()
      if (!(await fs.exists(dirPath)))
        return

      const stats = await fs.stat(dirPath)

      // 处理文件
      if (stats.isFile()) {
        // TODO
        return
      }

      // 处理目录
      if (stats.isDirectory()) {
        const titleConfig = MENU_CONFIG[dir]

        // 处理 menu 类型
        if ('menu' in titleConfig) {
          const { menuItems, flatItems } = await getItems(dirPath)
          const menus: MetaMenuItem = {
            ...titleConfig.menu,
            items: menuItems,
          }
          // push to meta
          addToMeta(titleConfig.metaKey, menus)
          addToMeta(flatItems)
        }
        if ('page' in titleConfig) {
          // TODO 需要看下
          // const { menuItems, flatItems } = getItems(dirPath)
          const menus: MetaPageItem = {
            ...titleConfig.page,
          }
          addToMeta(titleConfig.metaKey, menus)
          // addToMeta(flatItems)
        }
      }

      // const subjects = fs.readdirSync(dir)
    }))

  // 处理项目 markdown 文件
  // TODO

  return finalMeta
}
