#!/usr/bin/env -S npx tsx

import 'zx/globals'

import { getMetaJSON } from './gen_meta/index.mjs'
import { getFileMoveRecord, moveFiles } from './file_manage/move.mjs'
import { modifyFiles } from './file_manage/modify.mjs'
import { cloneRepo } from './clone_repo/index.mjs'
import { cleanup } from './cleanup.mjs'
import { awaitPromiseArr } from './await.mjs'
import { successLog } from './logger.mjs'
import { writeFinalJSON } from './file_manage/write.mjs'

await cleanup()

await cloneRepo()

await awaitPromiseArr([
  getMetaJSON().then((finalMetaJSON) => {
    // write meta.json
    return writeFinalJSON(finalMetaJSON)
  }),
  modifyFiles().then(() => {
    const record = getFileMoveRecord()
    return moveFiles(record)
  }),
])

successLog('ALL DONE!')

// end
// process.exit(0)

// clone 仓库
// 从仓库中找到需要的目录
// - learning notes: file or directory
//    - file:
//    - directory:
// Step1 可并行
// 处理目录
// 生成对应 meta json

// Step2 可并行
// 将对应目录的文件进行处理
// 移动到 pages/ 下
