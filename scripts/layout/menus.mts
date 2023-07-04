import type { ValueOf, XOR } from '../typings/utils'
import type { MetaMenuItem, MetaPageItem } from '../typings/meta/index'

export const TARGET_DIRECTORIES = [
  '02learning_notes',
  '08reading',
] as const

type MenuConfig = Record<ValueOf<typeof TARGET_DIRECTORIES>, XOR<{
  menu: Omit<MetaMenuItem, 'items'>
  metaKey: string
}, {
  metaKey: string
  page: MetaPageItem
}>>

export const MENU_CONFIG = {
  '02learning_notes': {
    menu: {
      title: 'Learning',
      display: 'hidden',
      type: 'menu',
    },
    metaKey: 'learning',
  },
  '08reading': {
    page: {
      title: 'Reading',
      type: 'page',
    },
    metaKey: 'reading',
  },
} satisfies Readonly<MenuConfig>

// const s = MENU_CONFIG['02learning_notes'].menu.title
