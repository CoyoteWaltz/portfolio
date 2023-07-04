import { Item, MenuItem, PageItem, PageTheme } from 'nextra/normalize-pages'

export {
  PageItem,
  Item,
  MenuItem,
  PageTheme,
}

export type MetaMenuItem = Pick<MenuItem, 'items' | 'type' | 'title' | 'display'>

export type MetaPageItem = Pick<Item, 'display' | 'title' | 'type'> & { theme?: Partial<Item['theme']> }

export type MenuSubItem = MetaMenuItem['items']

export type MetaJSON = Record<string, MetaPageItem | MetaMenuItem>
