// types/ghost.ts
export interface GhostPost {
  id: string
  slug: string
  title: string
  html: string
  excerpt: string
  feature_image: string | null
  featured: boolean
  published_at: string
  created_at: string
  updated_at: string
  url: string
  reading_time: number
  tags?: GhostTag[]
  authors?: GhostAuthor[]
  primary_author?: GhostAuthor
  primary_tag?: GhostTag
}

export interface GhostTag {
  id: string
  name: string
  slug: string
  description: string | null
  feature_image: string | null
  url: string
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image: string | null
  cover_image: string | null
  bio: string | null
  website: string | null
  location: string | null
  facebook: string | null
  twitter: string | null
  url: string
}

export interface GhostResponse {
  posts: GhostPost[]
  meta: {
    pagination: {
      page: number
      limit: number
      pages: number
      total: number
      next: number | null
      prev: number | null
    }
  }
}

export interface GhostFeed {
  posts: GhostPost[]
}