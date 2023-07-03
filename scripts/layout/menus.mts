import type { ValueOf, XOR } from '../typings/utils'
import type { MenuSubItem, MetaMenuItem, MetaPageItem } from '../typings/meta/index'
import { getItems } from './get-menu-items.mjs'

export const TARGET_DIRECTORIES = [
  '02learning_notes',
  '08reading',
] as const

type MenuConfig = Record<ValueOf<typeof TARGET_DIRECTORIES>, XOR<{
  menu: Omit<MetaMenuItem, 'items'>
  getItems: (dirName: string) => MenuSubItem
}, {
  page: MetaPageItem
}>>

export const MENU_CONFIG = {
  '02learning_notes': {
    menu: {
      title: 'Learning',
      display: 'hidden',
      type: 'menu',
    },
    getItems,
  },
  '08reading': {
    page: {
      title: 'Reading',
      display: 'normal',
    },
  },
} satisfies Readonly<MenuConfig>

// const s = MENU_CONFIG['02learning_notes'].menu.title
