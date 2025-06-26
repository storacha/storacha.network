// server/api/ghost/styles.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const ghostUrl = config.public.ghostUrl
  
  // Early return if Ghost URL is not configured
  if (!ghostUrl) {
    setResponseStatus(event, 503)
    setHeader(event, 'content-type', 'text/css')
    setHeader(event, 'x-ghost-cache', 'unavailable')
    return getFallbackCSS()
  }

  // Cache key for Cloudflare
  const cacheKey = `ghost-styles-${btoa(ghostUrl).slice(0, 12)}`
  
  try {
    // Check cache first
    const cached = await getCachedStyles(cacheKey)
    if (cached) {
      setHeader(event, 'content-type', 'text/css')
      setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')
      setHeader(event, 'x-ghost-cache', 'hit')
      return cached
    }

    // Fetch Ghost CSS from multiple possible paths
    const cleanGhostUrl = ghostUrl.replace(/\/$/, '')
    const cssEndpoints = [
      // Theme-specific CSS (most common for custom themes)
      '/assets/built/screen.css',      // Built/compiled CSS (most common)
      '/assets/css/screen.css',        // Source CSS files
      '/assets/built/main.css',        // Alternative build output
      '/assets/built/index.css',       // Another common build output
      
      // Public directory CSS (you were right!)
      '/public/ghost.css',             // Ghost's core public CSS
      '/public/cards.min.css',         // Ghost card styles
      '/public/portal.min.css',        // Portal styles
      
      // Additional possibilities
      '/assets/css/main.css',
      '/assets/css/global.css',
      '/assets/built/global.css'
    ]

    let ghostCSS = null
    let sourcePath = null

    for (const endpoint of cssEndpoints) {
      try {
        const response = await $fetch(`${cleanGhostUrl}${endpoint}`, {
          headers: {
            'User-Agent': 'Storacha-Nuxt-Bot/1.0',
            'Accept': 'text/css,*/*'
          },
          timeout: 8000
        })
        
        if (response && typeof response === 'string' && response.length > 100) {
          ghostCSS = response
          sourcePath = endpoint
          break
        }
      } catch (err) {
        console.log(`Ghost CSS not found at ${endpoint}`)
        continue
      }
    }

    if (!ghostCSS) {
      throw new Error('No Ghost CSS found at any endpoint')
    }

    console.log(`✅ Ghost CSS fetched from ${sourcePath} (${ghostCSS.length} chars)`)

    // Process the CSS for use in your app
    const processedCSS = processGhostCSS(ghostCSS, ghostUrl)
    
    // Cache the result
    await cacheStyles(cacheKey, processedCSS)
    
    setHeader(event, 'content-type', 'text/css')
    setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')
    setHeader(event, 'x-ghost-cache', 'miss')
    setHeader(event, 'x-ghost-source', sourcePath)
    
    return processedCSS
    
  } catch (error: any) {
    console.error('Ghost CSS fetch failed:', error.message)
    
    setResponseStatus(event, 503)
    setHeader(event, 'content-type', 'text/css')
    setHeader(event, 'cache-control', 'public, max-age=300, s-maxage=600')
    setHeader(event, 'x-ghost-cache', 'fallback')
    
    return getFallbackCSS()
  }
})

// Cache functions for Cloudflare Pages
async function getCachedStyles(key: string): Promise<string | null> {
  try {
    if (typeof globalThis.caches !== 'undefined') {
      const cache = await globalThis.caches.open('ghost-styles-v3')
      const request = new Request(`https://cache.internal/${key}`)
      const response = await cache.match(request)
      
      if (response && response.ok) {
        const cacheDate = response.headers.get('x-cache-date')
        if (cacheDate) {
          const ageHours = (Date.now() - new Date(cacheDate).getTime()) / (1000 * 60 * 60)
          if (ageHours < 24) { // Cache for 24 hours
            return await response.text()
          }
        }
      }
    }
    return null
  } catch (error) {
    console.warn('Cache retrieval failed:', error)
    return null
  }
}

async function cacheStyles(key: string, css: string): Promise<void> {
  try {
    if (typeof globalThis.caches !== 'undefined') {
      const cache = await globalThis.caches.open('ghost-styles-v3')
      const request = new Request(`https://cache.internal/${key}`)
      const response = new Response(css, {
        headers: {
          'content-type': 'text/css',
          'x-cache-date': new Date().toISOString(),
          'cache-control': 'public, max-age=86400'
        }
      })
      await cache.put(request, response)
    }
  } catch (error) {
    console.warn('Cache storage failed:', error)
  }
}

// Process Ghost CSS for your app
function processGhostCSS(css: string, ghostUrl: string): string {
  let processedCSS = css
    // Remove @import statements that might cause issues
    .replace(/@import[^;]+;/g, '')
    // Convert relative URLs to absolute
    .replace(/url\(['"]?\/([^)'"]+)['"]?\)/g, `url('${ghostUrl}/$1')`)
    // Remove any font declarations that might conflict
    .replace(/@font-face\s*{[^}]+}/g, '')

  // Scope all styles to .ghost-content to prevent conflicts
  processedCSS = processedCSS
    // Scope body styles
    .replace(/\bbody\b(?=\s*[{,])/g, '.ghost-content')
    // Scope html styles  
    .replace(/\bhtml\b(?=\s*[{,])/g, '.ghost-content-isolation')
    // Ensure post content selectors work
    .replace(/\.post-content\b/g, '.ghost-content')
    .replace(/\.post-full-content\b/g, '.ghost-content')
    // Scope article selectors
    .replace(/\barticle\b(?=\s*[{,])/g, '.ghost-content article')
    // Remove global resets that might interfere
    .replace(/\*\s*{\s*[^}]*}/g, '')

  return `
/* Ghost CMS Styles - Fetched and Processed */
/* Source: ${ghostUrl} */
/* Generated: ${new Date().toISOString()} */

/* Base isolation for Ghost content */
.ghost-content-isolation {
  all: revert;
  isolation: isolate;
  font-family: revert;
  max-width: none;
}

.ghost-content-isolation * {
  all: revert;
  box-sizing: border-box;
}

/* Ghost content foundation */
.ghost-content {
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  line-height: 1.6em;
  color: #15171a;
  max-width: none;
}

${processedCSS}

/* Ensure Ghost content styling takes precedence */
.ghost-content {
  font-family: Georgia, Times, "Times New Roman", serif !important;
  max-width: none !important;
}

.ghost-content * {
  max-width: none !important;
}
`
}

// Fallback CSS when Ghost is unavailable
function getFallbackCSS(): string {
  return `
/* Fallback Ghost Styles - Ghost Unavailable */
.ghost-content-isolation {
  all: revert;
  isolation: isolate;
  max-width: none;
}

.ghost-content {
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  line-height: 1.6em;
  color: #15171a;
  max-width: none;
}

.ghost-content h1, .ghost-content h2, .ghost-content h3,
.ghost-content h4, .ghost-content h5, .ghost-content h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 700;
  line-height: 1.25em;
  margin: 2em 0 0.5em 0;
  color: #15171a;
}

.ghost-content h1 { font-size: 3.2rem; }
.ghost-content h2 { font-size: 2.6rem; }
.ghost-content h3 { font-size: 2.0rem; }
.ghost-content h4 { font-size: 1.8rem; }
.ghost-content h5 { font-size: 1.6rem; }
.ghost-content h6 { font-size: 1.4rem; }

.ghost-content p {
  margin: 0 0 1.5em 0;
  line-height: 1.6em;
}

.ghost-content a {
  color: #0084ff;
  text-decoration: underline;
}

.ghost-content ul, .ghost-content ol {
  margin: 0 0 1.5em 0;
  padding-left: 2em;
}

.ghost-content li {
  margin-bottom: 0.5em;
  line-height: 1.6em;
}

.ghost-content blockquote {
  margin: 2em 0;
  padding: 0 0 0 1.5em;
  border-left: 4px solid #e5eff5;
  font-style: italic;
  color: #626d79;
}

.ghost-content code {
  background: #f1f1f1;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.85em;
  padding: 0.15em 0.4em;
  color: #eb5757;
}

.ghost-content pre {
  background: #15171a;
  color: #fff;
  border-radius: 6px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5em;
  margin: 2em 0;
  overflow-x: auto;
  padding: 1.5em;
}

.ghost-content pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.ghost-content .kg-image {
  width: 100%;
  height: auto;
  margin: 2em 0;
  border-radius: 6px;
}

.ghost-content .kg-gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5em;
  margin: 2em 0;
}

.ghost-content .kg-gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
}

.ghost-content .kg-bookmark-card {
  border: 1px solid #e5eff5;
  border-radius: 6px;
  padding: 1em;
  margin: 2em 0;
  text-decoration: none;
  display: block;
  background: #fff;
}

.ghost-content .kg-bookmark-title {
  font-weight: 600;
  margin-bottom: 0.5em;
  color: #15171a;
}

.ghost-content .kg-bookmark-description {
  color: #626d79;
  font-size: 14px;
}

.ghost-content .kg-callout-card {
  background: #f8fbfe;
  border-left: 4px solid #0084ff;
  border-radius: 0 6px 6px 0;
  margin: 2em 0;
  padding: 1.5em;
}

.ghost-content .kg-button-card {
  margin: 2em 0;
  text-align: center;
}

.ghost-content .kg-btn {
  background: #0084ff;
  border-radius: 6px;
  color: #fff;
  display: inline-block;
  font-weight: 600;
  padding: 12px 24px;
  text-decoration: none;
}

.ghost-content .kg-btn:hover {
  background: #005aa3;
  color: #fff;
}

@media (max-width: 768px) {
  .ghost-content { font-size: 18px; }
  .ghost-content h1 { font-size: 2.4rem; }
  .ghost-content h2 { font-size: 2.0rem; }
  .ghost-content h3 { font-size: 1.6rem; }
}
`
}