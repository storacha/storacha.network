import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BlogCard from '~/components/Blog/Card.vue'
import type { Item } from '~/types/blog'

// Mock global composables  
const mockUseAppDateFormat = vi.fn((date: string) => new Date(date).toLocaleDateString())

// Mock AppLink component
const MockAppLink = {
  name: 'AppLink',
  props: ['href', 'style'],
  template: '<a :href="href" :style="style"><slot></slot></a>'
}

// Mock Heading component
const MockHeading = {
  name: 'Heading',
  props: ['type', 'class'],
  template: '<h5 :class="$props.class"><slot></slot></h5>'
}

// Mock Card component
const MockCard = {
  name: 'Card',
  props: ['class'],
  template: '<div :class="$props.class"><div class="card-header"><slot name="header"></slot></div><div class="card-body"><slot></slot></div></div>'
}

// Mock Nuxt composables
vi.mock('#app', () => ({
  useAppDateFormat: mockUseAppDateFormat
}))

const mockItem: Item = {
  title: 'Test Blog Post',
  snippet: 'This is a test blog post snippet with some content.',
  link: 'https://example.com/test-post',
  pubDate: '2023-01-01T00:00:00Z',
  isoDate: '2023-01-01T00:00:00Z',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
}

const defaultGlobalConfig = {
  components: {
    AppLink: MockAppLink,
    Heading: MockHeading,
    Card: MockCard
  }
}

describe('BlogCard', () => {
  it('renders blog post with all required information', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem,
        showSnippet: true
      },
      global: defaultGlobalConfig
    })

    expect(wrapper.text()).toContain('Test Blog Post')
    expect(wrapper.text()).toContain('This is a test blog post snippet')
  })

  it('displays the first image from the item', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem
      },
      global: defaultGlobalConfig
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image1.jpg')
    expect(img.attributes('alt')).toBe('Test Blog Post')
  })

  it('shows snippet when showSnippet prop is true', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem,
        showSnippet: true
      },
      global: defaultGlobalConfig
    })

    expect(wrapper.text()).toContain(mockItem.snippet)
  })

  it('hides snippet when showSnippet prop is false', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem,
        showSnippet: false
      },
      global: defaultGlobalConfig
    })

    expect(wrapper.text()).not.toContain(mockItem.snippet)
  })

  it('defaults showSnippet to false when not provided', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem
      },
      global: defaultGlobalConfig
    })

    expect(wrapper.text()).not.toContain(mockItem.snippet)
  })

  it('creates correct links to the blog post', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem
      },
      global: defaultGlobalConfig
    })

    const links = wrapper.findAllComponents(MockAppLink)
    expect(links).toHaveLength(2) // One for image, one for content
    
    links.forEach(link => {
      expect(link.props('href')).toBe(mockItem.link)
    })
  })

  it('displays publication date correctly', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem
      },
      global: defaultGlobalConfig
    })

    const timeElement = wrapper.find('time')
    expect(timeElement.exists()).toBe(true)
    expect(timeElement.attributes('datetime')).toBe(mockItem.pubDate)
  })

  it('handles missing images gracefully', () => {
    const itemWithoutImages: Item = {
      ...mockItem,
      images: []
    }

    const wrapper = mount(BlogCard, {
      props: {
        item: itemWithoutImages
      },
      global: defaultGlobalConfig
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBeUndefined() // Should be undefined from images[0]
  })

  it('handles undefined images array gracefully', () => {
    const itemWithUndefinedImages: Item = {
      ...mockItem,
      images: undefined
    }

    const wrapper = mount(BlogCard, {
      props: {
        item: itemWithUndefinedImages
      },
      global: defaultGlobalConfig
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBeUndefined() // Should be undefined from images?.[0]
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem
      },
      global: defaultGlobalConfig
    })

    // Check for main classes on different elements
    expect(wrapper.find('.aspect-ratio-video').exists()).toBe(true)
    expect(wrapper.find('.overflow-hidden').exists()).toBe(true)
    expect(wrapper.find('.h-full.w-full.object-cover.object-left').exists()).toBe(true)
  })

  it('renders with minimal item data', () => {
    const minimalItem: Item = {
      title: 'Minimal Post',
      snippet: '',
      link: '#',
      pubDate: '2023-01-01T00:00:00Z',
      isoDate: '2023-01-01T00:00:00Z',
      images: []
    }

    const wrapper = mount(BlogCard, {
      props: {
        item: minimalItem
      },
      global: defaultGlobalConfig
    })

    expect(wrapper.text()).toContain('Minimal Post')
    expect(wrapper.findComponent(MockAppLink).props('href')).toBe('#')
  })

  it('sets correct img loading and alt attributes', () => {
    const wrapper = mount(BlogCard, {
      props: {
        item: mockItem
      },
      global: defaultGlobalConfig
    })

    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('alt')).toBe(mockItem.title)
  })

  it('handles long titles correctly', () => {
    const itemWithLongTitle: Item = {
      ...mockItem,
      title: 'This is a very long title that might wrap to multiple lines and should still be displayed correctly'
    }

    const wrapper = mount(BlogCard, {
      props: {
        item: itemWithLongTitle
      },
      global: defaultGlobalConfig
    })

    expect(wrapper.text()).toContain(itemWithLongTitle.title)
  })

  it('handles long snippets correctly', () => {
    const itemWithLongSnippet: Item = {
      ...mockItem,
      snippet: 'This is a very long snippet that might contain a lot of text and should be displayed properly without breaking the layout or causing any issues with the component rendering.'
    }

    const wrapper = mount(BlogCard, {
      props: {
        item: itemWithLongSnippet,
        showSnippet: true
      },
      global: defaultGlobalConfig
    })

    expect(wrapper.text()).toContain(itemWithLongSnippet.snippet)
    // Check that the text has the break-words class for proper wrapping
    expect(wrapper.find('.break-words').exists()).toBe(true)
  })
})
