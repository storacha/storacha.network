import { test, expect } from '@playwright/test'

test.describe('Homepage Navigation', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page loads and has expected content
    await expect(page).toHaveTitle(/Storacha/)
    
    // Look for main navigation elements
    await expect(page.locator('nav')).toBeVisible()
    
    // Check for main content areas
    await expect(page.locator('main, [role="main"]')).toBeVisible()
  })

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/')
    
    // Look for main navigation links
    await expect(page.locator('a[href="/blog"]')).toBeVisible()
    await expect(page.locator('a[href="/ecosystem"]')).toBeVisible()
    await expect(page.locator('a[href="/roadmap"]')).toBeVisible()
  })

  test('should navigate to blog page', async ({ page }) => {
    await page.goto('/')
    
    // Click on blog navigation link
    await page.click('a[href="/blog"]')
    
    // Wait for navigation and check URL
    await expect(page).toHaveURL(/\/blog/)
    
    // Check that blog page content is visible
    await expect(page.locator('h1, h2')).toBeVisible()
  })

  test('should navigate to ecosystem page', async ({ page }) => {
    await page.goto('/')
    
    // Click on ecosystem navigation link
    await page.click('a[href="/ecosystem"]')
    
    // Wait for navigation and check URL
    await expect(page).toHaveURL(/\/ecosystem/)
    
    // Check that ecosystem page content is visible
    await expect(page.locator('h1, h2')).toBeVisible()
  })

  test('should have working footer links', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded()
    
    // Check footer is visible
    await expect(page.locator('footer')).toBeVisible()
    
    // Look for common footer elements
    const footerLinks = page.locator('footer a')
    await expect(footerLinks.first()).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    await page.goto('/')
    
    if (isMobile) {
      // Check that mobile navigation works
      const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-expanded]')
      
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click()
        
        // Check that mobile menu opens
        await expect(page.locator('nav [role="menu"], nav .menu')).toBeVisible()
      }
    }
    
    // Check that main content is visible regardless of device
    await expect(page.locator('main, [role="main"]')).toBeVisible()
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Check for essential SEO meta tags
    await expect(page.locator('meta[name="description"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1)
  })

  test('should have working search functionality if present', async ({ page }) => {
    await page.goto('/')
    
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]')
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test search')
      await searchInput.press('Enter')
      
      // Check that search results or search page loads
      await page.waitForTimeout(1000)
      // This is a basic check - specific implementation would depend on search functionality
    }
  })

  test('should handle external links correctly', async ({ page }) => {
    await page.goto('/')
    
    // Look for external links (those that should open in new tab)
    const externalLinks = page.locator('a[target="_blank"], a[href^="http"]:not([href*="storacha.network"])')
    
    if (await externalLinks.first().isVisible()) {
      const firstExternalLink = externalLinks.first()
      
      // Check that external links have proper attributes
      await expect(firstExternalLink).toHaveAttribute('target', '_blank')
      await expect(firstExternalLink).toHaveAttribute('rel', /noopener/)
    }
  })

  test('should load without JavaScript errors', async ({ page }) => {
    const consoleErrors: string[] = []
    
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text())
      }
    })
    
    await page.goto('/')
    
    // Wait a moment for any lazy-loaded content
    await page.waitForTimeout(2000)
    
    // Check that there are no critical JavaScript errors
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && // Ignore favicon errors
      !error.includes('analytics') && // Ignore analytics errors
      !error.includes('tracking') // Ignore tracking errors
    )
    
    expect(criticalErrors).toHaveLength(0)
  })
})
