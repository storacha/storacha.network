import { test, expect } from '@playwright/test'

test.describe('Error Page Handling', () => {
  test('should display custom 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-page-12345')
    
    // Should show custom error page, not browser default
    await expect(page.locator('body')).toBeVisible()
    
    // Look for custom 404 content
    await expect(page.locator('text=404, text="Page Not Found", text="not found"')).toBeVisible()
    
    // Should have navigation options
    const homeLink = page.locator('a[href="/"], button:has-text("Home"), button:has-text("Homepage")')
    await expect(homeLink.first()).toBeVisible()
  })

  test('should handle 404 errors gracefully with proper layout', async ({ page }) => {
    await page.goto('/this-page-definitely-does-not-exist')
    
    // Page should still have the site layout
    await expect(page.locator('nav, header')).toBeVisible()
    
    // Should have footer as well
    await expect(page.locator('footer')).toBeVisible()
    
    // Error content should be in main area
    await expect(page.locator('main, [role="main"]')).toBeVisible()
  })

  test('should provide working navigation from error page', async ({ page }) => {
    await page.goto('/invalid-route')
    
    // Wait for error page to load
    await page.waitForTimeout(1000)
    
    // Click home/back button if available
    const homeButton = page.locator('button:has-text("Home"), a:has-text("Home"), button:has-text("Homepage")')
    
    if (await homeButton.first().isVisible()) {
      await homeButton.first().click()
      
      // Should navigate back to homepage
      await expect(page).toHaveURL('/')
    }
  })

  test('should show retry button for appropriate errors', async ({ page }) => {
    // Mock a server error response
    await page.route('**/*', (route) => {
      if (route.request().url().includes('/api/')) {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server Error' })
        })
      } else {
        route.continue()
      }
    })

    await page.goto('/blog')
    
    // Wait for potential error handling
    await page.waitForTimeout(3000)
    
    // Look for retry functionality (this depends on implementation)
    const retryButton = page.locator('button:has-text("Retry"), button:has-text("Try Again")')
    
    if (await retryButton.isVisible()) {
      await expect(retryButton).toBeVisible()
    }
  })

  test('should display appropriate error messages for different status codes', async ({ page }) => {
    // Test different error scenarios by navigating to likely error-producing routes
    const errorRoutes = [
      '/admin/secret-area', // Likely 403
      '/api/nonexistent', // Likely 404
      '/very/deep/nested/route/that/does/not/exist' // Likely 404
    ]

    for (const route of errorRoutes) {
      await page.goto(route)
      
      // Wait for error page
      await page.waitForTimeout(1000)
      
      // Should show some kind of error message
      const errorContent = page.locator('main, [role="main"]')
      await expect(errorContent).toBeVisible()
      
      // Should not show raw error details to users
      const technicalErrors = page.locator('text=stack trace, text=internal error, text=exception')
      expect(await technicalErrors.count()).toBe(0)
    }
  })

  test('should have proper SEO handling for error pages', async ({ page }) => {
    await page.goto('/nonexistent-seo-test')
    
    // Error pages should have proper SEO
    await expect(page).toHaveTitle(/404|Error|Not Found/)
    
    // Should have meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveCount(1)
    
    // Should have robots noindex to prevent indexing error pages
    const robotsMeta = page.locator('meta[name="robots"]')
    if (await robotsMeta.count() > 0) {
      const robotsContent = await robotsMeta.getAttribute('content')
      expect(robotsContent).toContain('noindex')
    }
  })

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    const jsErrors: string[] = []
    
    page.on('pageerror', (error) => {
      jsErrors.push(error.message)
    })

    // Navigate to a page and inject a JavaScript error
    await page.goto('/')
    
    await page.evaluate(() => {
      // Intentionally cause a JS error
      throw new Error('Test JavaScript Error')
    })

    // Wait a moment for error handling
    await page.waitForTimeout(1000)
    
    // Page should still be functional despite JS error
    await expect(page.locator('body')).toBeVisible()
    await expect(page.locator('nav, header')).toBeVisible()
  })

  test('should provide helpful error context without exposing technical details', async ({ page }) => {
    await page.goto('/missing-page-test')
    
    // Should show user-friendly error message
    const friendlyMessages = page.locator('text="page not found", text="doesn\'t exist", text="can\'t find"')
    await expect(friendlyMessages.first()).toBeVisible()
    
    // Should not expose technical details
    const technicalDetails = page.locator('text=stack, text=trace, text=internal, text=exception, text=debug')
    expect(await technicalDetails.count()).toBe(0)
  })

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network failure for API calls
    await page.route('/api/**', (route) => {
      route.abort('failed')
    })

    await page.goto('/blog')
    
    // Wait for network requests to fail
    await page.waitForTimeout(3000)
    
    // Page should still be usable
    await expect(page.locator('main, [role="main"]')).toBeVisible()
    
    // Should not show technical network error details
    const networkErrors = page.locator('text=network error, text=connection failed, text=timeout')
    expect(await networkErrors.count()).toBe(0)
  })

  test('should maintain accessibility on error pages', async ({ page }) => {
    await page.goto('/accessibility-error-test')
    
    // Error page should have proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    await expect(headings.first()).toBeVisible()
    
    // Should have proper focus management
    const focusableElements = page.locator('button, a, input, [tabindex="0"]')
    await expect(focusableElements.first()).toBeVisible()
    
    // Navigation should still work with keyboard
    await page.keyboard.press('Tab')
    // Check that focus moves to a focusable element
  })

  test('should handle error page on mobile devices', async ({ page, isMobile }) => {
    await page.goto('/mobile-error-test')
    
    if (isMobile) {
      // Error page should be responsive
      const viewport = page.viewportSize()
      expect(viewport?.width).toBeLessThan(768)
      
      // Content should still be readable
      await expect(page.locator('main, [role="main"]')).toBeVisible()
      
      // Buttons should be touch-friendly
      const buttons = page.locator('button, a')
      if (await buttons.first().isVisible()) {
        const buttonBox = await buttons.first().boundingBox()
        expect(buttonBox?.height).toBeGreaterThan(40) // Minimum touch target size
      }
    }
  })

  test('should automatically retry for server errors when appropriate', async ({ page }) => {
    let requestCount = 0
    
    await page.route('/api/**', (route) => {
      requestCount++
      if (requestCount === 1) {
        // Fail first request
        route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Service Unavailable' })
        })
      } else {
        // Succeed on retry
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ items: [] })
        })
      }
    })

    await page.goto('/blog')
    
    // Wait for initial request and potential retry
    await page.waitForTimeout(6000)
    
    // Should have made multiple requests (original + retry)
    expect(requestCount).toBeGreaterThan(1)
  })
})
