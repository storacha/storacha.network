import type { ParsedContent as DefaultParsedContent } from '@nuxt/content/'

export interface JsonParsedContent<T> extends Omit<DefaultParsedContent, 'body'> {
  body: T
}
export type ParsedContent<T> = DefaultParsedContent & T
