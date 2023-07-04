#!/usr/bin/env -S npx tsx

import 'zx/globals'
import { fs, path } from 'zx'

import type { MetaJSON, MetaMenuItem } from '../typings/meta'
import { MENU_CONFIG, TARGET_DIRECTORIES } from './menus.mjs'
import { getItems } from './get-menu-items.mjs'

await $`pwd`
// await $`git clone https://github.com/CoyoteWaltz/MarkdownNotes.git --depth 1 --branch master --single-branch temp`

console.log(chalk.green('Hello, World!'))
// clone 仓库
// 从仓库中找到需要的目录
// - learning notes: file or directory
//    - file:
//    - directory:
// 处理目录
// 生成对应 meta json

const TEMP_REPO_PATH = './temp'
console.log('TARGET_DIRECTORIES', TARGET_DIRECTORIES)

const finalMeta: MetaJSON = {}

function addToMeta(key: string, data: (MetaJSON)[string]): MetaJSON
function addToMeta(data: MetaJSON): MetaJSON
function addToMeta(keyOrData: string | MetaJSON, data?: (MetaJSON)[string]) {
  if (typeof keyOrData === 'string')
    finalMeta[keyOrData] = data
  else
    Object.assign(finalMeta, keyOrData)
  return finalMeta
}

// 处理第一层 navigation
TARGET_DIRECTORIES.forEach((dir) => {
  // find md/mdx files or directories inside the folder
  const dirPath = path.join(TEMP_REPO_PATH, dir)
  // fs.ensureDirSync()
  if (!fs.existsSync(dirPath))
    return

  const stats = fs.statSync(dirPath)
  console.log('exist', dirPath)
  if (stats.isFile()) {
    // 处理文件
  }
  if (stats.isDirectory()) {
    // 处理目录
    const titleConfig = MENU_CONFIG[dir]
    console.log(`${dir}(dir)->`, titleConfig)
    if ('menu' in titleConfig) {
      const { menuItems, flatItems } = getItems(dirPath)
      const menus: MetaMenuItem = {
        ...titleConfig.menu,
        items: menuItems,
      }
      console.log()
      // push to meta
      addToMeta(titleConfig.metaKey, menus)
      addToMeta(flatItems)
      // 生成 meta
      // 处理所有的文件
      // mv 到 pages/ 下
    }
  }

  // const subjects = fs.readdirSync(dir)
})
console.log(chalk.green('final meta>>>'))

console.log(chalk.cyan(JSON.stringify(finalMeta, null, 2)))

// write meta.json
fs.ensureDirSync('./scripts/layout/test')
fs.writeFileSync('./scripts/layout/test/_meta.json', JSON.stringify(finalMeta, null, 2))
