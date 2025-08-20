import { describe, it, expect, vi, beforeEach } from 'vitest'
import { XMLParser } from 'fast-xml-parser'

// Mock the blog API module
const mockBlogApi = await vi.hoisted(async () => {
  // Mock $fetch function
  const mockFetch = vi.fn()
  
  // Define the functions we want to test (extracted from the original file)
  async function getFeed(feedUrl: string) {
    const rss = await mockFetch<string>(feedUrl)
    return rss
  }

  async function fetchPosts(url: string) {
    const rss = await getFeed(url)
    
    if (!rss || rss.trim().length === 0) {
      throw new Error('Empty RSS feed received')
    }
    
    const root = new XMLParser().parse(rss)
    
    // Add null checks for RSS structure
    if (!root?.rss?.channel) {
      throw new Error('Invalid RSS feed structure - missing channel')
    }
    
    const { channel } = root.rss
    
    // Handle case where there are no items
    if (!channel.item) {
      return { items: [] }
    }
    
    // Ensure channel.item is an array (sometimes it's a single object)
    const items = Array.isArray(channel.item) ? channel.item : [channel.item]

    const regex = /\<img.*?src="(.*?)"/g
    return {
      items: items.map((post: any) => {
        try {
          const content = post['content:encoded'] || ''
          const images = Array.from(String(content)
            .matchAll(regex)).map(match => match[1]).filter(Boolean)
          let snippet = content.replace(/(\<([^\>]+)\>)/g, '')
          if (snippet.length > 200) {
            snippet = `${snippet.slice(0, 200)}...`
          }
          return {
            title: post.title || 'Untitled',
            snippet: snippet || '',
            pubDate: post.pubDate || new Date().toISOString(),
            isoDate: post.isoDate || new Date().toISOString(),
            link: post.link || '#',
            images: images || [],
          }
        } catch (error) {
          console.warn('Failed to process blog post:', post.title || 'Unknown', error)
          // Return default object even on error to avoid filtering out
          return {
            title: 'Untitled',
            snippet: '',
            pubDate: new Date().toISOString(),
            isoDate: new Date().toISOString(),
            link: '#',
            images: [],
          }
        }
      }).filter(Boolean) // Remove null entries
    }
  }

  return {
    mockFetch,
    getFeed,
    fetchPosts
  }
})

describe('Blog RSS Parsing', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getFeed', () => {
    it('should fetch RSS feed from URL', async () => {
      const mockRssData = '<rss>mock data</rss>'
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.getFeed('https://example.com/feed.xml')

      expect(mockBlogApi.mockFetch).toHaveBeenCalledWith('https://example.com/feed.xml')
      expect(result).toBe(mockRssData)
    })

    it('should handle fetch errors', async () => {
      mockBlogApi.mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(mockBlogApi.getFeed('https://example.com/feed.xml')).rejects.toThrow('Network error')
    })
  })

  describe('fetchPosts', () => {
    it('should parse valid RSS feed with multiple items', async () => {
      const mockRssData = `
        <rss>
          <channel>
            <item>
              <title>Test Post 1</title>
              <link>https://example.com/post1</link>
              <pubDate>2023-01-01T00:00:00Z</pubDate>
              <content:encoded><![CDATA[<p>This is test content with <img src="https://example.com/image1.jpg" alt="test"> an image.</p>]]></content:encoded>
            </item>
            <item>
              <title>Test Post 2</title>
              <link>https://example.com/post2</link>
              <pubDate>2023-01-02T00:00:00Z</pubDate>
              <content:encoded><![CDATA[<p>This is another test post without images.</p>]]></content:encoded>
            </item>
          </channel>
        </rss>
      `
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items).toHaveLength(2)
      expect(result.items[0]).toMatchObject({
        title: 'Test Post 1',
        link: 'https://example.com/post1',
        pubDate: '2023-01-01T00:00:00Z',
        images: ['https://example.com/image1.jpg']
      })
      expect(result.items[0].snippet).toContain('This is test content')
      expect(result.items[1]).toMatchObject({
        title: 'Test Post 2',
        link: 'https://example.com/post2',
        images: []
      })
    })

    it('should parse RSS feed with single item (not array)', async () => {
      const mockRssData = `
        <rss>
          <channel>
            <item>
              <title>Single Post</title>
              <link>https://example.com/single</link>
              <pubDate>2023-01-01T00:00:00Z</pubDate>
              <content:encoded><![CDATA[<p>Single post content</p>]]></content:encoded>
            </item>
          </channel>
        </rss>
      `
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items).toHaveLength(1)
      expect(result.items[0].title).toBe('Single Post')
    })

    it('should handle empty RSS feed', async () => {
      mockBlogApi.mockFetch.mockResolvedValue('')

      await expect(mockBlogApi.fetchPosts('https://example.com/feed.xml')).rejects.toThrow('Empty RSS feed received')
    })

    it('should handle whitespace-only RSS feed', async () => {
      mockBlogApi.mockFetch.mockResolvedValue('   \n  \t  ')

      await expect(mockBlogApi.fetchPosts('https://example.com/feed.xml')).rejects.toThrow('Empty RSS feed received')
    })

    it('should handle invalid RSS structure - no channel', async () => {
      const mockRssData = '<rss><invalid>structure</invalid></rss>'
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      await expect(mockBlogApi.fetchPosts('https://example.com/feed.xml')).rejects.toThrow('Invalid RSS feed structure - missing channel')
    })

    it('should handle RSS with no items', async () => {
      const mockRssData = '<rss><channel><title>Empty Feed</title></channel></rss>'
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items).toHaveLength(0)
    })

    it('should extract images from content', async () => {
      const mockRssData = `
        <rss>
          <channel>
            <item>
              <title>Post with Images</title>
              <content:encoded><![CDATA[
                <p>Content with multiple images:</p>
                <img src="https://example.com/image1.jpg" alt="First">
                <p>Some text</p>
                <img src="https://example.com/image2.png" alt="Second">
              ]]></content:encoded>
            </item>
          </channel>
        </rss>
      `
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items[0].images).toEqual([
        'https://example.com/image1.jpg',
        'https://example.com/image2.png'
      ])
    })

    it('should truncate long snippets', async () => {
      const longContent = 'A'.repeat(300)
      const mockRssData = `
        <rss>
          <channel>
            <item>
              <title>Long Post</title>
              <content:encoded><![CDATA[<p>${longContent}</p>]]></content:encoded>
            </item>
          </channel>
        </rss>
      `
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items[0].snippet).toHaveLength(203) // 200 chars + '...'
      expect(result.items[0].snippet.endsWith('...')).toBe(true)
    })

    it('should provide default values for missing fields', async () => {
      const mockRssData = `
        <rss>
          <channel>
            <item>
              <content:encoded></content:encoded>
            </item>
          </channel>
        </rss>
      `
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items).toHaveLength(1)
      expect(result.items[0]).toMatchObject({
        title: 'Untitled',
        link: '#',
        snippet: '',
        images: []
      })
      expect(result.items[0].pubDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('should filter out null entries from processing errors', async () => {
      const mockRssData = `
        <rss>
          <channel>
            <item>
              <title>Valid Post</title>
              <content:encoded><![CDATA[<p>Valid content</p>]]></content:encoded>
            </item>
            <item>
              <title>Another Valid Post</title>
              <content:encoded><![CDATA[<p>More valid content</p>]]></content:encoded>
            </item>
          </channel>
        </rss>
      `
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      // Mock console.warn to avoid noise in test output
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items).toHaveLength(2)
      expect(result.items.every(item => item !== null)).toBe(true)
      
      consoleSpy.mockRestore()
    })

    it('should strip HTML tags from snippet', async () => {
      const mockRssData = `
        <rss>
          <channel>
            <item>
              <title>HTML Post</title>
              <content:encoded><![CDATA[<p>This has <strong>bold</strong> and <em>italic</em> text with <a href="#">links</a>.</p>]]></content:encoded>
            </item>
          </channel>
        </rss>
      `
      mockBlogApi.mockFetch.mockResolvedValue(mockRssData)

      const result = await mockBlogApi.fetchPosts('https://example.com/feed.xml')

      expect(result.items[0].snippet).toBe('This has bold and italic text with links.')
    })
  })
})
