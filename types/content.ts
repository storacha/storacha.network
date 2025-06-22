// Updated for Nuxt Content v3
import type { ParsedContentv2 as DefaultParsedContent, ParsedContentFile } from '@nuxt/content'

export interface JsonParsedContent<T> extends ParsedContentFile {
  body: T
}

export type ParsedContent<T> = DefaultParsedContent & T