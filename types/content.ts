import type { ParsedContent as DefaultParsedContent, ParsedContentMeta } from '@nuxt/content/'

export interface JsonParsedContent<T> extends ParsedContentMeta {
  body: T
}
export type ParsedContent<T> = DefaultParsedContent & T
