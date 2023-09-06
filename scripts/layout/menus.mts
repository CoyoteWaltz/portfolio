import type { ValueOf, XOR } from '../typings/utils'
import type { MetaMenuItem, MetaPageItem } from '../typings/meta/index'

export const TARGET_DIRECTORIES = [
  '02learning_notes',
  '08reading/literature_notes',
] as const

export type MenuConfigValue = {
  metaKey: string
} & XOR<{
  menu: Omit<MetaMenuItem, 'items'>
}, {
  page: MetaPageItem
}>

export type MenuConfig = Record<ValueOf<typeof TARGET_DIRECTORIES>, MenuConfigValue>

export const MENU_CONFIG = {
  [TARGET_DIRECTORIES[0]]: {
    menu: {
      title: 'Learning',
      type: 'menu',
    },
    metaKey: 'learning',
  },
  [TARGET_DIRECTORIES[1]]: {
    page: {
      title: 'Reading',
      type: 'page',
    },
    metaKey: 'reading',
  },
} satisfies Readonly<MenuConfig>

// const s = MENU_CONFIG['02learning_notes'].menu.title
