import title from 'title'

export function pageTitleFromFilename(fileName: string) {
  return title(fileName.replace(/[-_]/g, ' '))
}
