// Basic content types without Nuxt Content dependency

export interface JsonParsedContent<T> {
  body: T
}

export type ParsedContent<T> = T