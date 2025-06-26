// utils/ghostAdapter.ts
import type { GhostPost, GhostFeed } from '~/types/ghost'
import type { Feed, Item } from '~/types/blog'

/**
 * Transforms Ghost CMS data into the existing blog format
 * so we can reuse all existing components without modification
 */
export function transformGhostToFeed(ghostFeed: GhostFeed): Feed {
  const items: Item[] = ghostFeed.posts.map(transformGhostPostToItem)
  
  return {
    items
  }
}

export function transformGhostPostToItem(post: GhostPost): Item {
  return {
    title: post.title,
    snippet: post.excerpt || extractTextFromHtml(post.html) || 'No excerpt available',
    link: `/ghost/${post.slug}`, // 🔥 CHANGED THIS LINE
    pubDate: post.published_at,
    isoDate: post.published_at,
    images: post.feature_image ? [post.feature_image] : undefined
  }
}

/**
 * Extract plain text from HTML for snippet
 * Fallback if Ghost doesn't provide excerpt
 */
function extractTextFromHtml(html: string): string {
  // Remove HTML tags and get first 150 characters
  const text = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[^;]+;/g, ' ') // Remove HTML entities
    .trim()
  
  return text.length > 150 
    ? text.substring(0, 150) + '...'
    : text
}