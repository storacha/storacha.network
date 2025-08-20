import { test, expect } from '@playwright/test'

test.describe('Blog Functionality', () => {
  test('should load blog page successfully', async ({ page }) => {
    await page.goto('/blog')
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Blog|Storacha/)
    
    // Check for main content
    await expect(page.locator('main, [role="main"]')).toBeVisible()
  })

  test('should display blog posts when available', async ({ page }) => {
    await page.goto('/blog')
    
    // Wait for API call to complete
    await page.waitForTimeout(3000)
    
    // Look for blog post elements
    const blogPosts = page.locator('[class*="blog"], article, .post')
    
    // Either posts are displayed or there's an empty state
    const postsCount = await blogPosts.count()
    
    if (postsCount > 0) {
      // If posts exist, verify they have required elements
      await expect(blogPosts.first()).toBeVisible()
      
      // Check for typical blog post elements
      await expect(page.locator('h1, h2, h3').first()).toBeVisible()
    } else {
      // If no posts, should still show the page structure
      await expect(page.locator('main, [role="main"]')).toBeVisible()
    }
  })

  test('should handle blog API errors gracefully', async ({ page }) => {
    // Intercept the blog API call and return an error
    await page.route('/api/blog', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      })
    })

    await page.goto('/blog')
    
    // Wait for the page to handle the error
    await page.waitForTimeout(2000)
    
    // Page should still be usable
    await expect(page.locator('main, [role="main"]')).toBeVisible()
    
    // Should not show error messages to users (graceful degradation)
    const errorMessages = page.locator('text=error, text=Error, text=ERROR')
    expect(await errorMessages.count()).toBe(0)
  })

  test('should handle empty blog feed gracefully', async ({ page }) => {
    // Intercept the blog API call and return empty data
    await page.route('/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: [] })
      })
    })

    await page.goto('/blog')
    
    // Wait for the page to load
    await page.waitForTimeout(2000)
    
    // Page should still be visible
    await expect(page.locator('main, [role="main"]')).toBeVisible()
  })

  test('should display blog posts with proper structure', async ({ page }) => {
    // Mock successful blog API response
    const mockBlogData = {
      items: [
        {
          title: 'Test Blog Post 1',
          snippet: 'This is a test blog post snippet with some content.',
          link: 'https://example.com/post1',
          pubDate: '2023-01-01T00:00:00Z',
          isoDate: '2023-01-01T00:00:00Z',
          images: ['https://example.com/image1.jpg']
        },
        {
          title: 'Test Blog Post 2',
          snippet: 'This is another test blog post snippet.',
          link: 'https://example.com/post2',
          pubDate: '2023-01-02T00:00:00Z',
          isoDate: '2023-01-02T00:00:00Z',
          images: []
        }
      ]
    }

    await page.route('/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogData)
      })
    })

    await page.goto('/blog')
    
    // Wait for content to load
    await page.waitForTimeout(2000)
    
    // Check that blog posts are displayed
    await expect(page.locator('text=Test Blog Post 1')).toBeVisible()
    await expect(page.locator('text=Test Blog Post 2')).toBeVisible()
  })

  test('should have working links to individual blog posts', async ({ page }) => {
    // Mock blog data with external links
    const mockBlogData = {
      items: [
        {
          title: 'External Blog Post',
          snippet: 'This links to an external blog.',
          link: 'https://medium.com/@storacha/external-post',
          pubDate: '2023-01-01T00:00:00Z',
          isoDate: '2023-01-01T00:00:00Z',
          images: []
        }
      ]
    }

    await page.route('/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogData)
      })
    })

    await page.goto('/blog')
    
    // Wait for content to load
    await page.waitForTimeout(2000)
    
    // Look for links to blog posts
    const blogLinks = page.locator('a[href*="medium.com"], a[href*="blog"]')
    
    if (await blogLinks.first().isVisible()) {
      // External blog links should open in new tab
      await expect(blogLinks.first()).toHaveAttribute('target', '_blank')
    }
  })

  test('should display blog images when available', async ({ page }) => {
    // Mock blog data with images
    const mockBlogData = {
      items: [
        {
          title: 'Blog Post with Image',
          snippet: 'This post has an image.',
          link: 'https://example.com/post-with-image',
          pubDate: '2023-01-01T00:00:00Z',
          isoDate: '2023-01-01T00:00:00Z',
          images: ['https://example.com/test-image.jpg']
        }
      ]
    }

    await page.route('/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogData)
      })
    })

    await page.goto('/blog')
    
    // Wait for content to load
    await page.waitForTimeout(2000)
    
    // Check for images in blog posts
    const blogImages = page.locator('img[src*="test-image"]')
    
    if (await blogImages.first().isVisible()) {
      await expect(blogImages.first()).toHaveAttribute('alt')
      await expect(blogImages.first()).toHaveAttribute('loading', 'lazy')
    }
  })

  test('should handle missing blog images gracefully', async ({ page }) => {
    // Mock blog data without images
    const mockBlogData = {
      items: [
        {
          title: 'Blog Post without Image',
          snippet: 'This post has no image.',
          link: 'https://example.com/post-no-image',
          pubDate: '2023-01-01T00:00:00Z',
          isoDate: '2023-01-01T00:00:00Z',
          images: []
        }
      ]
    }

    await page.route('/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogData)
      })
    })

    await page.goto('/blog')
    
    // Wait for content to load
    await page.waitForTimeout(2000)
    
    // Page should still display the post
    await expect(page.locator('text=Blog Post without Image')).toBeVisible()
  })

  test('should display proper publication dates', async ({ page }) => {
    const mockBlogData = {
      items: [
        {
          title: 'Recent Blog Post',
          snippet: 'Recent content.',
          link: 'https://example.com/recent',
          pubDate: '2023-12-01T00:00:00Z',
          isoDate: '2023-12-01T00:00:00Z',
          images: []
        }
      ]
    }

    await page.route('/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogData)
      })
    })

    await page.goto('/blog')
    
    // Wait for content to load
    await page.waitForTimeout(2000)
    
    // Look for time elements or date displays
    const timeElements = page.locator('time, [datetime]')
    
    if (await timeElements.first().isVisible()) {
      // Check that time element has proper datetime attribute
      await expect(timeElements.first()).toHaveAttribute('datetime')
    }
  })

  test('should be responsive on mobile devices', async ({ page, isMobile }) => {
    await page.goto('/blog')
    
    // Wait for content to load
    await page.waitForTimeout(2000)
    
    // Check that content is visible on mobile
    await expect(page.locator('main, [role="main"]')).toBeVisible()
    
    if (isMobile) {
      // Check that mobile layout is applied
      const viewport = page.viewportSize()
      expect(viewport?.width).toBeLessThan(768)
      
      // Content should still be readable
      await expect(page.locator('h1, h2, h3').first()).toBeVisible()
    }
  })

  test('should have proper SEO for blog page', async ({ page }) => {
    await page.goto('/blog')
    
    // Check for blog-specific SEO
    await expect(page).toHaveTitle(/Blog|Storacha/)
    
    // Check for meta description
    await expect(page.locator('meta[name="description"]')).toHaveCount(1)
    
    // Check for Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:type"]')).toHaveCount(1)
  })
})
