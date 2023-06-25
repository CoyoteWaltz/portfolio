#!/usr/bin/env -S npx tsx

import 'zx/globals'
import { fs } from 'zx'

import { TARGET_DIRECTORIES } from './menus'

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

console.log('TARGET_DIRECTORIES', TARGET_DIRECTORIES)

TARGET_DIRECTORIES.forEach((dir) => {
  // find md/mdx files or directories inside the folder
  const subjects = fs.readdirSync(dir)
  console.log(subjects)
})
