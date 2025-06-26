// composables/useGhostStyles.ts
export const useGhostStyles = () => {
  const stylesLoaded = ref(false)
  const stylesError = ref(false)
  const isLoading = ref(false)
  const loadTime = ref(0)
  const cacheStatus = ref('')

  const loadGhostStyles = async () => {
    // Prevent double loading
    if (stylesLoaded.value || isLoading.value || document.getElementById('ghost-dynamic-styles')) {
      return { success: true, fromCache: true }
    }

    isLoading.value = true
    const startTime = Date.now()

    try {
      // Try to fetch real Ghost CSS from your API endpoint
      const response = await fetch('/api/ghost/styles', {
        headers: {
          'Accept': 'text/css'
        }
      })

      if (response.ok) {
        const cssText = await response.text()
        loadTime.value = Date.now() - startTime
        cacheStatus.value = response.headers.get('x-ghost-cache') || 'unknown'

        // Inject the fetched Ghost CSS
        const styleElement = document.createElement('style')
        styleElement.id = 'ghost-dynamic-styles'
        styleElement.setAttribute('data-source', 'ghost-api')
        styleElement.textContent = cssText
        document.head.appendChild(styleElement)

        stylesLoaded.value = true
        stylesError.value = false

        if (process.dev) {
          console.log(`✅ Ghost styles loaded in ${loadTime.value}ms (cache: ${cacheStatus.value})`)
        }

        return { 
          success: true, 
          fromCache: cacheStatus.value === 'hit',
          loadTime: loadTime.value,
          source: 'ghost-api'
        }
      } else {
        throw new Error(`Failed to fetch Ghost CSS: ${response.status}`)
      }
      
    } catch (error: any) {
      console.warn('Failed to load dynamic Ghost styles, using fallback:', error.message)
      stylesError.value = true
      
      // Load enhanced fallback styles
      loadEnhancedFallbackStyles()
      
      stylesLoaded.value = true // Mark as loaded so we don't retry
      
      return { 
        success: false, 
        error: error.message,
        fallback: true,
        source: 'fallback'
      }
    } finally {
      isLoading.value = false
    }
  }

  const loadEnhancedFallbackStyles = () => {
    if (document.getElementById('ghost-fallback-styles')) {
      return
    }

    // Enhanced fallback CSS that closely matches Ghost
    const fallbackCSS = `
/* Enhanced Ghost Fallback Styles */
.ghost-content {
  font-family: Georgia, Times, "Times New Roman", serif !important;
  font-size: 20px !important;
  line-height: 1.6em !important;
  color: #15171A !important;
  max-width: none !important;
}

.ghost-content h1, .ghost-content h2, .ghost-content h3,
.ghost-content h4, .ghost-content h5, .ghost-content h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-weight: 700 !important;
  line-height: 1.25em !important;
  margin: 2em 0 0.5em 0 !important;
  color: #15171A !important;
}

.ghost-content h1 { font-size: 3.2rem !important; }
.ghost-content h2 { font-size: 2.6rem !important; }
.ghost-content h3 { font-size: 2.0rem !important; }
.ghost-content h4 { font-size: 1.8rem !important; }
.ghost-content h5 { font-size: 1.6rem !important; }
.ghost-content h6 { font-size: 1.4rem !important; }

.ghost-content p {
  margin: 0 0 1.5em 0 !important;
  line-height: 1.6em !important;
  font-size: 20px !important;
}

.ghost-content a {
  color: #0084FF !important;
  text-decoration: underline !important;
}

.ghost-content ul, .ghost-content ol {
  margin: 0 0 1.5em 0 !important;
  padding-left: 2em !important;
}

.ghost-content li {
  margin-bottom: 0.5em !important;
  line-height: 1.6em !important;
}

.ghost-content blockquote {
  margin: 2em 0 !important;
  padding: 0 0 0 1.5em !important;
  border-left: 4px solid #E5EFF5 !important;
  font-style: italic !important;
  color: #626D79 !important;
  background: none !important;
}

.ghost-content code {
  background: #F1F1F1 !important;
  border-radius: 3px !important;
  font-family: monospace !important;
  font-size: 0.85em !important;
  padding: 0.15em 0.4em !important;
  color: #EB5757 !important;
}

.ghost-content pre {
  background: #15171A !important;
  color: #FFF !important;
  border-radius: 6px !important;
  font-family: monospace !important;
  font-size: 14px !important;
  line-height: 1.5em !important;
  margin: 2em 0 !important;
  overflow-x: auto !important;
  padding: 1.5em !important;
}

.ghost-content pre code {
  background: none !important;
  color: inherit !important;
  padding: 0 !important;
}

.ghost-content .kg-image {
  width: 100% !important;
  height: auto !important;
  margin: 2em 0 !important;
  border-radius: 6px !important;
  display: block !important;
}

.ghost-content .kg-gallery-container {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
  gap: 0.5em !important;
  margin: 2em 0 !important;
}

.ghost-content .kg-gallery-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  border-radius: 3px !important;
  margin: 0 !important;
}

.ghost-content .kg-bookmark-card {
  border: 1px solid #E5EFF5 !important;
  border-radius: 6px !important;
  display: flex !important;
  margin: 2em 0 !important;
  overflow: hidden !important;
  text-decoration: none !important;
  background: #FFF !important;
}

.ghost-content .kg-bookmark-content {
  padding: 20px !important;
  flex-grow: 1 !important;
}

.ghost-content .kg-bookmark-title {
  font-weight: 600 !important;
  margin-bottom: 8px !important;
  color: #15171A !important;
  font-size: 16px !important;
}

.ghost-content .kg-bookmark-description {
  color: #626D79 !important;
  font-size: 14px !important;
  margin-bottom: 8px !important;
}

.ghost-content .kg-callout-card {
  background: #F8FBFE !important;
  border-left: 4px solid #0084FF !important;
  border-radius: 0 6px 6px 0 !important;
  margin: 2em 0 !important;
  padding: 1.5em !important;
}

.ghost-content .kg-callout-emoji {
  font-size: 1.5em !important;
  margin-bottom: 0.5em !important;
  display: block !important;
}

.ghost-content .kg-button-card {
  margin: 2em 0 !important;
  text-align: center !important;
}

.ghost-content .kg-btn {
  background: #0084FF !important;
  border-radius: 6px !important;
  color: #FFF !important;
  display: inline-block !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
}

.ghost-content .kg-btn:hover {
  background: #005AA3 !important;
  color: #FFF !important;
}

@media (max-width: 768px) {
  .ghost-content { font-size: 18px !important; }
  .ghost-content h1 { font-size: 2.4rem !important; }
  .ghost-content h2 { font-size: 2.0rem !important; }
  .ghost-content h3 { font-size: 1.6rem !important; }
}
`

    const styleElement = document.createElement('style')
    styleElement.id = 'ghost-fallback-styles'
    styleElement.setAttribute('data-source', 'fallback')
    styleElement.textContent = fallbackCSS
    document.head.appendChild(styleElement)
  }

  // Auto-load on client side
  if (process.client) {
    onMounted(async () => {
      await loadGhostStyles()
    })
  }

  return {
    stylesLoaded: readonly(stylesLoaded),
    stylesError: readonly(stylesError),
    isLoading: readonly(isLoading),
    loadTime: readonly(loadTime),
    cacheStatus: readonly(cacheStatus),
    loadGhostStyles
  }
}