export interface Feed {
  items: Item[]
  feedUrl: string
  image: Image
  paginationLinks: PaginationLinks
  title: string
  description: string
  webMaster: string
  generator: string
  link: string
  lastBuildDate: string
}

export interface Item {
  'creator': string
  'title': string
  'link': string
  'pubDate': string
  'content:encoded': string
  'content:encodedSnippet': string
  'dc:creator': string
  'guid': string
  'categories': string[]
  'isoDate': string
}

export interface Image {
  link: string
  url: string
  title: string
}

export interface PaginationLinks {
  self: string
}
