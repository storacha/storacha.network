export interface Feed {
  items: Item[]
}

export interface Item {
  title: string
  snippet: string
  link: string
  pubDate: string
  isoDate: string
  images?: string[]
}

export interface Image {
  link: string
  url: string
  title: string
}

export interface PaginationLinks {
  self: string
}
