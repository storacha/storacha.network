import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BlogCell from '~/components/Blog/Cell.vue'
import type { Feed } from '~/types/blog'

// Mock useLazyFetch composable
const mockUseLazyFetch = vi.fn()
vi.mock('#app', () => ({
  useLazyFetch: mockUseLazyFetch
}))

// Mock global computed to avoid reactivity issues in tests
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    computed: vi.fn((fn) => ({ value: fn() }))
  }
})

// Mock BlogCard component
const MockBlogCard = {
  name: 'BlogCard',
  props: ['item'],
  template: '<div class="blog-card-mock">{{ item.title }}</div>'
}

// Mock AppLink component
const MockAppLink = {
  name: 'AppLink',
  props: ['href', 'primary'],
  template: '<a :href="href" :class="{ primary }"><slot></slot></a>'
}

// Mock AppIcon component
const MockAppIcon = {
  name: 'AppIcon',
  props: ['i'],
  template: '<span :class="i"></span>'
}

const mockFeedData: Feed = {
  items: [
    {
      title: 'First Blog Post',
      snippet: 'This is the first blog post snippet.',
      link: 'https://example.com/first-post',
      pubDate: '2023-01-01T00:00:00Z',
      isoDate: '2023-01-01T00:00:00Z',
      images: ['https://example.com/image1.jpg']
    },
    {
      title: 'Second Blog Post',
      snippet: 'This is the second blog post snippet.',
      link: 'https://example.com/second-post',
      pubDate: '2023-01-02T00:00:00Z',
      isoDate: '2023-01-02T00:00:00Z',
      images: ['https://example.com/image2.jpg']
    },
    {
      title: 'Third Blog Post',
      snippet: 'This is the third blog post snippet.',
      link: 'https://example.com/third-post',
      pubDate: '2023-01-03T00:00:00Z',
      isoDate: '2023-01-03T00:00:00Z',
      images: []
    }
  ]
}

describe.skip('BlogCell', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders blog posts correctly when data is available', async () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: mockFeedData }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    // Should only show first 2 items as per the slice(0, 2) in the component
    const blogCards = wrapper.findAllComponents(MockBlogCard)
    expect(blogCards).toHaveLength(2)
    
    expect(blogCards[0].props('item')).toEqual(mockFeedData.items[0])
    expect(blogCards[1].props('item')).toEqual(mockFeedData.items[1])
  })

  it('handles empty blog feed gracefully', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: { items: [] } }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    const blogCards = wrapper.findAllComponents(MockBlogCard)
    expect(blogCards).toHaveLength(0)
    
    // Should still show the "View Storacha Blog" link
    const blogLink = wrapper.findComponent(MockAppLink)
    expect(blogLink.exists()).toBe(true)
    expect(blogLink.props('href')).toBe('/blog')
  })

  it('handles null/undefined blog data gracefully', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: null }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    const blogCards = wrapper.findAllComponents(MockBlogCard)
    expect(blogCards).toHaveLength(0)
  })

  it('handles undefined items array gracefully', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: { items: undefined } }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    const blogCards = wrapper.findAllComponents(MockBlogCard)
    expect(blogCards).toHaveLength(0)
  })

  it('limits display to first 2 blog posts', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: mockFeedData }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    // Even though mockFeedData has 3 items, should only show 2
    const blogCards = wrapper.findAllComponents(MockBlogCard)
    expect(blogCards).toHaveLength(2)
    
    // Should show first two items
    expect(blogCards[0].props('item').title).toBe('First Blog Post')
    expect(blogCards[1].props('item').title).toBe('Second Blog Post')
  })

  it('displays "View Storacha Blog" link correctly', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: mockFeedData }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    const blogLink = wrapper.findComponent(MockAppLink)
    expect(blogLink.exists()).toBe(true)
    expect(blogLink.props('href')).toBe('/blog')
    expect(blogLink.props('primary')).toBe(true)
    expect(blogLink.text()).toContain('View Storacha Blog')
  })

  it('includes arrow icon in the blog link', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: mockFeedData }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    const icon = wrapper.findComponent(MockAppIcon)
    expect(icon.exists()).toBe(true)
    expect(icon.props('i')).toBe('i-carbon:arrow-right')
  })

  it('calls useLazyFetch with correct parameters', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: { items: [] } }
    })

    mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    expect(mockUseLazyFetch).toHaveBeenCalledWith('/api/blog', {
      server: false,
      default: expect.any(Function)
    })

    // Test the default function
    const defaultFunction = mockUseLazyFetch.mock.calls[0][1].default
    expect(defaultFunction()).toEqual({ items: [] })
  })

  it('applies correct CSS classes for layout', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: mockFeedData }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    // Check for main layout classes
    expect(wrapper.find('.h-full.flex.items-center.justify-center').exists()).toBe(true)
    expect(wrapper.find('.blog-cell.grid.gap-4.sm\\:cols-2').exists()).toBe(true)
    expect(wrapper.find('.mt-10.flex.items-center.justify-center.p1').exists()).toBe(true)
  })

  it('applies grid-rows-subgrid class to blog cards', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: mockFeedData }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    const blogCards = wrapper.findAllComponents(MockBlogCard)
    blogCards.forEach(card => {
      expect(card.classes()).toContain('grid-rows-subgrid')
    })
  })

  it('handles single blog post correctly', () => {
    const singleItemFeed: Feed = {
      items: [mockFeedData.items[0]]
    }

    mockUseLazyFetch.mockReturnValue({
      data: { value: singleItemFeed }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    const blogCards = wrapper.findAllComponents(MockBlogCard)
    expect(blogCards).toHaveLength(1)
    expect(blogCards[0].props('item')).toEqual(singleItemFeed.items[0])
  })

  it('maintains proper key attributes for blog cards', () => {
    mockUseLazyFetch.mockReturnValue({
      data: { value: mockFeedData }
    })

    const wrapper = mount(BlogCell, {
      global: {
        components: {
          BlogCard: MockBlogCard,
          AppLink: MockAppLink,
          AppIcon: MockAppIcon
        }
      }
    })

    // In Vue test utils, we can't directly test v-for keys, but we can ensure
    // the components are rendered with the correct props that would be used as keys
    const blogCards = wrapper.findAllComponents(MockBlogCard)
    expect(blogCards[0].props('item').title).toBe('First Blog Post')
    expect(blogCards[1].props('item').title).toBe('Second Blog Post')
  })
})
