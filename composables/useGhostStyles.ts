// composables/useGhostStyles.ts - Fixed version with proper CSS injection
export const useGhostStyles = () => {
  const stylesLoaded = ref(false)
  const stylesError = ref(false)
  const isLoading = ref(false)

  const loadGhostStyles = async () => {
    // Prevent multiple loads
    if (stylesLoaded.value || isLoading.value) {
      return { success: true, cached: true }
    }

    // Check if already injected
    if (document.getElementById('ghost-styles') || document.getElementById('ghost-fallback')) {
      stylesLoaded.value = true
      return { success: true, cached: true }
    }

    isLoading.value = true
    console.log('🔄 Loading Ghost styles...')

    try {
      // Try to load from API endpoint
      const response = await $fetch('/api/ghost/styles', {
        headers: { 
          'Accept': 'text/css',
          'Cache-Control': 'public, max-age=3600'
        },
        timeout: 8000
      })

      if (response && typeof response === 'string' && response.length > 100) {
        // ✅ Inject the actual CSS response
        const styleElement = document.createElement('style')
        styleElement.id = 'ghost-styles'
        styleElement.type = 'text/css'
        styleElement.textContent = response
        document.head.appendChild(styleElement)

        stylesLoaded.value = true
        stylesError.value = false

        console.log('✅ Ghost styles loaded from API:', response.length, 'characters')
        console.log('🎯 CSS injected into element:', styleElement.id)
        return { success: true, source: 'api', length: response.length }
      } else {
        throw new Error(`Invalid CSS response: ${typeof response}, length: ${response?.length || 0}`)
      }
      
    } catch (error: any) {
      console.warn('⚠️ Ghost API styles failed, using comprehensive fallback:', error?.message || error)
      
      // ✅ Force load comprehensive fallback styles
      const fallbackSuccess = loadComprehensiveFallbackStyles()
      
      stylesLoaded.value = true
      stylesError.value = true
      
      return { 
        success: fallbackSuccess, 
        source: 'fallback', 
        error: error?.message || String(error)
      }
    } finally {
      isLoading.value = false
    }
  }

  const loadComprehensiveFallbackStyles = () => {
    // Remove any existing fallback
    const existingFallback = document.getElementById('ghost-fallback')
    if (existingFallback) {
      existingFallback.remove()
    }

    // ✅ Comprehensive Ghost CSS that will definitely work
    const comprehensiveGhostCSS = `
/* =================================================================
   COMPREHENSIVE GHOST CMS STYLES - FALLBACK
   Generated: ${new Date().toISOString()}
   ================================================================= */

/* Root Isolation - Critical for preventing framework conflicts */
.ghost-content-isolation {
  isolation: isolate !important;
  contain: layout style !important;
  all: initial !important;
  display: block !important;
  width: 100% !important;
  max-width: none !important;
  
  /* Kill all framework variables */
  --tw-ring-shadow: initial !important;
  --tw-shadow: initial !important;
  --tw-space-x-reverse: initial !important;
  --tw-space-y-reverse: initial !important;
  --uno-ring-shadow: initial !important;
  --uno-shadow: initial !important;
}

.ghost-content-isolation *,
.ghost-content-isolation *::before,
.ghost-content-isolation *::after {
  box-sizing: border-box !important;
  --tw-ring-shadow: initial !important;
  --tw-shadow: initial !important;
  --tw-space-x-reverse: initial !important;
  --tw-space-y-reverse: initial !important;
  --uno-ring-shadow: initial !important;
  --uno-shadow: initial !important;
}

/* Base Ghost Content Container */
.ghost-content {
  all: initial !important;
  display: block !important;
  font-family: Georgia, Times, "Times New Roman", serif !important;
  font-size: 20px !important;
  line-height: 1.6 !important;
  color: #15171A !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Reset all children to prevent inheritance */
.ghost-content * {
  all: revert !important;
  box-sizing: border-box !important;
  font-family: inherit !important;
}

/* Typography - Force Ghost styles */
.ghost-content h1,
.ghost-content h2,
.ghost-content h3,
.ghost-content h4,
.ghost-content h5,
.ghost-content h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-weight: 700 !important;
  color: #15171A !important;
  margin: 1.5em 0 0.5em 0 !important;
  line-height: 1.25 !important;
  display: block !important;
}

.ghost-content h1 { font-size: 3.2rem !important; margin-top: 0 !important; }
.ghost-content h2 { font-size: 2.6rem !important; }
.ghost-content h3 { font-size: 2.0rem !important; }
.ghost-content h4 { font-size: 1.8rem !important; }
.ghost-content h5 { font-size: 1.6rem !important; }
.ghost-content h6 { font-size: 1.4rem !important; }

.ghost-content p {
  margin: 0 0 1.5em 0 !important;
  line-height: 1.6 !important;
  font-size: 20px !important;
  color: #15171A !important;
  display: block !important;
}

.ghost-content a {
  color: #0084FF !important;
  text-decoration: underline !important;
  text-decoration-color: rgba(0, 132, 255, 0.3) !important;
  text-underline-offset: 2px !important;
  transition: all 0.2s ease !important;
}

.ghost-content a:hover {
  text-decoration-color: #0084FF !important;
}

/* Lists */
.ghost-content ul,
.ghost-content ol {
  margin: 0 0 1.5em 0 !important;
  padding-left: 2em !important;
  display: block !important;
}

.ghost-content ul { list-style-type: disc !important; }
.ghost-content ol { list-style-type: decimal !important; }

.ghost-content li {
  margin-bottom: 0.5em !important;
  line-height: 1.6 !important;
  display: list-item !important;
}

/* Blockquotes */
.ghost-content blockquote {
  margin: 2em 0 !important;
  padding: 0 0 0 1.5em !important;
  border-left: 4px solid #E5EFF5 !important;
  font-style: italic !important;
  color: #626D79 !important;
  display: block !important;
}

/* Code */
.ghost-content code {
  background: #F1F1F1 !important;
  border-radius: 3px !important;
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace !important;
  font-size: 0.85em !important;
  padding: 0.15em 0.4em !important;
  color: #EB5757 !important;
}

.ghost-content pre {
  background: #15171A !important;
  color: #FFF !important;
  border-radius: 6px !important;
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  margin: 2em 0 !important;
  overflow-x: auto !important;
  padding: 1.5em !important;
  display: block !important;
}

.ghost-content pre code {
  background: none !important;
  color: inherit !important;
  padding: 0 !important;
}

/* Horizontal Rules */
.ghost-content hr {
  border: none !important;
  border-top: 1px solid #E5EFF5 !important;
  margin: 3em 0 !important;
  height: 1px !important;
  display: block !important;
}

/* ===== GHOST CARDS - CRITICAL SECTION ===== */

/* Images */
.ghost-content img {
  display: block !important;
  max-width: 100% !important;
  height: auto !important;
  margin: 2em auto !important;
  border-radius: 6px !important;
}

.ghost-content figure {
  margin: 2em 0 !important;
  display: block !important;
}

/* Button Cards - Target Ghost's actual button structure */
.ghost-content a[class*="not-kg-prose"],
.ghost-content button[class*="not-kg-prose"] {
  background: #FF1A75 !important;
  color: #fff !important;
  padding: 0 !important;
  border-radius: 6px !important;
  text-decoration: none !important;
  display: inline-block !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-weight: 600 !important;
  border: none !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  text-align: center !important;
  margin: 1em 0 !important;
}

.ghost-content a[class*="not-kg-prose"]:hover,
.ghost-content button[class*="not-kg-prose"]:hover {
  background: #CD0051 !important;
  color: #fff !important;
  text-decoration: none !important;
  transform: translateY(-1px) !important;
}

.ghost-content a[class*="not-kg-prose"] span,
.ghost-content button[class*="not-kg-prose"] span {
  display: block !important;
  padding: 1rem 1.5rem !important;
  font-size: 16px !important;
  line-height: 1.4 !important;
}

/* Bookmark Cards - Target actual Ghost bookmark structure */
.ghost-content div[class*="flex"][class*="min-h-"] {
  border: 1px solid #E5EFF5 !important;
  border-radius: 6px !important;
  display: flex !important;
  margin: 2em 0 !important;
  overflow: hidden !important;
  background: #FFF !important;
  text-decoration: none !important;
  color: inherit !important;
  transition: box-shadow 0.15s ease !important;
}

.ghost-content div[class*="flex"][class*="min-h-"]:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08) !important;
  text-decoration: none !important;
}

/* Bookmark content area */
.ghost-content div[class*="flex"][class*="grow"][class*="basis-full"] {
  display: flex !important;
  flex-direction: column !important;
  flex-grow: 1 !important;
  padding: 20px !important;
  min-width: 0 !important;
}

/* Bookmark titles */
.ghost-content div[class*="text-"][class*="font-semibold"] {
  color: #15171A !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  line-height: 1.4 !important;
  margin-bottom: 8px !important;
}

/* Bookmark descriptions */
.ghost-content div[class*="line-clamp-2"] {
  color: #626D79 !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  margin-bottom: 8px !important;
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}

/* Bookmark thumbnails */
.ghost-content div[class*="grow-1"][class*="relative"] {
  flex-shrink: 0 !important;
  width: 160px !important;
  min-width: 33% !important;
  overflow: hidden !important;
  position: relative !important;
}

.ghost-content div[class*="grow-1"][class*="relative"] img {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  border-radius: 0 6px 6px 0 !important;
}

/* Gallery Cards */
.ghost-content figure div[data-testid="gallery-container"] {
  margin: 2em 0 !important;
  display: block !important;
}

.ghost-content div[data-gallery="true"] {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
}

.ghost-content div[data-row] {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  gap: 4px !important;
}

.ghost-content div[class*="group/image"] {
  position: relative !important;
  overflow: hidden !important;
  border-radius: 3px !important;
}

.ghost-content div[class*="group/image"] img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  margin: 0 !important;
  border-radius: 0 !important;
}

/* Header Cards */
.ghost-content div[class*="font-sans"][style*="background-color"] {
  display: flex !important;
  width: 100% !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  margin: 2em 0 !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  min-height: 200px !important;
}

.ghost-content div[class*="mx-auto"][class*="flex-1"] {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 4rem 2rem !important;
  text-align: center !important;
}

/* Header text */
.ghost-content div[class*="heading-large"] p {
  font-size: 3rem !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  margin: 0 0 1rem 0 !important;
}

.ghost-content div[class*="subheading-large"] p {
  font-size: 1.25rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  margin: 0 !important;
  opacity: 0.8 !important;
}

/* Video Cards */
.ghost-content figure[class*="not-kg-prose"] {
  margin: 2em 0 !important;
  position: relative !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  display: block !important;
}

.ghost-content div[data-testid="video-card-populated"] {
  position: relative !important;
  border-radius: 8px !important;
  overflow: hidden !important;
}

.ghost-content div[data-testid="video-card-populated"] img {
  width: 100% !important;
  height: auto !important;
  display: block !important;
}

/* File Cards */
.ghost-content div[class*="justify-between"][class*="rounded-md"][class*="border"] {
  border: 1px solid #E5EFF5 !important;
  border-radius: 6px !important;
  display: flex !important;
  margin: 2em 0 !important;
  padding: 0.5rem !important;
  background: #FFF !important;
  align-items: center !important;
}

/* Embed Cards */
.ghost-content iframe {
  width: 100% !important;
  border: none !important;
  border-radius: 6px !important;
  margin: 2em 0 !important;
  display: block !important;
  min-height: 400px !important;
}

.ghost-content iframe[src*="youtube"],
.ghost-content iframe[src*="youtu.be"] {
  aspect-ratio: 16 / 9 !important;
  height: auto !important;
}

.ghost-content iframe[src*="twitter"],
.ghost-content iframe[src*="x.com"] {
  max-width: 550px !important;
  margin: 2em auto !important;
}

/* Call to Action Cards */
.ghost-content div[class*="rounded-lg"][class*="border"][data-cta-layout] {
  background: #F8FBFE !important;
  border: 1px solid #E5EFF5 !important;
  border-radius: 8px !important;
  margin: 2em 0 !important;
  padding: 0 !important;
  display: block !important;
}

.ghost-content div[class*="gap-6"][class*="pt-6"] {
  display: flex !important;
  gap: 1.5rem !important;
  padding: 1.5rem 1.5rem 1.75rem 1.5rem !important;
  flex-direction: row !important;
}

/* Text utilities that Ghost uses */
.ghost-content .text-grey-800,
.ghost-content .text-grey-900,
.ghost-content [class*="text-grey-8"],
.ghost-content [class*="text-grey-9"] {
  color: #626D79 !important;
}

.ghost-content .text-grey-100,
.ghost-content .text-grey-200,
.ghost-content [class*="text-grey-1"],
.ghost-content [class*="text-grey-2"] {
  color: #15171A !important;
}

.ghost-content .bg-accent,
.ghost-content [style*="bg-accent"] {
  background: #FF1A75 !important;
  color: #fff !important;
}

.ghost-content .bg-accent:hover,
.ghost-content [style*="bg-accent"]:hover {
  background: #CD0051 !important;
  color: #fff !important;
}

/* Common utility classes */
.ghost-content .flex { display: flex !important; }
.ghost-content .flex-col { flex-direction: column !important; }
.ghost-content .items-center { align-items: center !important; }
.ghost-content .justify-center { justify-content: center !important; }
.ghost-content .rounded-md { border-radius: 6px !important; }
.ghost-content .rounded-lg { border-radius: 8px !important; }

/* Responsive Design */
@media (max-width: 768px) {
  .ghost-content {
    font-size: 18px !important;
  }
  
  .ghost-content h1 { font-size: 2.4rem !important; }
  .ghost-content h2 { font-size: 2.0rem !important; }
  .ghost-content h3 { font-size: 1.6rem !important; }
  
  .ghost-content div[class*="flex"][class*="min-h-"] {
    flex-direction: column !important;
  }
  
  .ghost-content div[class*="grow-1"][class*="relative"] {
    width: 100% !important;
    min-width: 100% !important;
    height: 200px !important;
  }
  
  .ghost-content div[class*="grow-1"][class*="relative"] img {
    border-radius: 0 0 6px 6px !important;
  }
  
  .ghost-content div[data-row] {
    flex-direction: column !important;
    gap: 2px !important;
  }
  
  .ghost-content div[class*="mx-auto"][class*="flex-1"] {
    padding: 2rem 1rem !important;
  }
  
  .ghost-content div[class*="heading-large"] p {
    font-size: 2rem !important;
  }
  
  .ghost-content div[class*="subheading-large"] p {
    font-size: 1rem !important;
  }
}

/* =================================================================
   END COMPREHENSIVE GHOST STYLES
   ================================================================= */
`

    try {
      const styleElement = document.createElement('style')
      styleElement.id = 'ghost-fallback'
      styleElement.type = 'text/css'
      styleElement.textContent = comprehensiveGhostCSS
      document.head.appendChild(styleElement)
      
      console.log('✅ Comprehensive Ghost fallback styles injected')
      console.log('🎯 CSS injected into element:', styleElement.id)
      console.log('📏 CSS length:', comprehensiveGhostCSS.length, 'characters')
      
      return true
    } catch (error) {
      console.error('❌ Failed to inject fallback styles:', error)
      return false
    }
  }

  // Auto-load on client side
  if (process.client) {
    onMounted(async () => {
      console.log('🔄 useGhostStyles: onMounted - starting CSS load')
      const result = await loadGhostStyles()
      console.log('🎯 useGhostStyles: load result:', result)
    })
  }

  return {
    stylesLoaded: readonly(stylesLoaded),
    stylesError: readonly(stylesError),
    isLoading: readonly(isLoading),
    loadGhostStyles
  }
}