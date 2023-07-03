#!/usr/bin/env -S npx tsx

import 'zx/globals'
import { fs, path } from 'zx'

import type { MetaMenuItem } from '../typings/meta'
import { MENU_CONFIG, TARGET_DIRECTORIES } from './menus.mjs'

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
      const items = titleConfig.getItems(dirPath)
      const menus: MetaMenuItem = {
        ...titleConfig.menu,
        items,
      }
      console.log(JSON.stringify(menus, null, 2))
      console.log()
    }
  }

  // const subjects = fs.readdirSync(dir)
})
