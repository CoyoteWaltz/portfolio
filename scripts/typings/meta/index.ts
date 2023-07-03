import { Item, MenuItem, PageItem, PageTheme } from 'nextra/normalize-pages'

export {
  PageItem,
  Item,
  MenuItem,
  PageTheme,
}

export type MetaMenuItem = Pick<MenuItem, 'items' | 'type' | 'title' | 'display'>

export type MetaPageItem = Pick<Item, 'display' | 'theme' | 'title'>

export type MenuSubItem = MetaMenuItem['items']
