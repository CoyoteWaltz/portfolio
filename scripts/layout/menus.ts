import type { ValueOf } from '../typings/utils'

export const TARGET_DIRECTORIES = [
  '02learning_notes',
  '08reading',
] as const

type MenuConfig = Record<ValueOf<typeof TARGET_DIRECTORIES>, {
  menu: {
    title: string
    // TODO use types from nextra
  }
}>

export const MENU_CONFIG = {
  '02learning_notes': {
    menu: {
      title: 'Learning',
    },
  },
  '08reading': {
    menu: {
      title: 'Reading',
    },
  },
} as const satisfies Readonly<MenuConfig>

// const s = MENU_CONFIG['02learning_notes'].menu.title
