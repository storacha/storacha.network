// 2. REVERT composables/useGhostStyles.ts - Back to simple working version
export const useGhostStyles = () => {
  const stylesLoaded = ref(false)
  const stylesError = ref(false)
  const isLoading = ref(false)

  const loadGhostStyles = async () => {
    if (stylesLoaded.value || isLoading.value) {
      return { success: true, cached: true }
    }

    if (!process.client) return { success: false, reason: 'not-client' }

    if (document.getElementById('ghost-styles') && document.getElementById('ghost-scripts')) {
      stylesLoaded.value = true
      return { success: true, cached: true }
    }

    isLoading.value = true
    console.log('🎨 Loading Ghost assets...')

    try {
      const cssResponse = await $fetch<string>('/api/ghost/assets?type=css', {
        headers: { 'Accept': 'text/css' },
        timeout: 10000
      })

      if (cssResponse && typeof cssResponse === 'string' && cssResponse.length > 100) {
        document.querySelectorAll('#ghost-styles').forEach(el => el.remove())

        const styleElement = document.createElement('style')
        styleElement.id = 'ghost-styles'
        styleElement.textContent = cssResponse
        document.head.appendChild(styleElement)

        console.log('✅ Ghost CSS loaded:', cssResponse.length, 'characters')
      }

      const existingScript = document.getElementById('ghost-scripts')
      if (existingScript) existingScript.remove()

      const script = document.createElement('script')
      script.id = 'ghost-scripts'
      script.src = '/api/ghost/assets?type=js'
      script.async = true
      
      const scriptPromise = new Promise<boolean>((resolve, reject) => {
        script.onload = () => {
          console.log('✅ Ghost JS loaded')
          resolve(true)
        }
        script.onerror = () => {
          console.warn('⚠️ Ghost JS failed to load')
          reject(new Error('Script failed to load'))
        }
      })

      document.head.appendChild(script)
      await scriptPromise

      stylesLoaded.value = true
      stylesError.value = false
      
      return { success: true, source: 'api' }

    } catch (err: any) {
      console.warn('⚠️ Ghost assets failed:', err?.message || String(err))
      stylesError.value = true
      
      loadFallback()
      
      return { 
        success: false, 
        source: 'fallback', 
        error: err?.message || String(err)
      }
    } finally {
      isLoading.value = false
    }
  }

  const loadFallback = () => {
    if (!process.client) return

    const fallbackCSS = `
      .ghost-content-isolation { background: transparent !important; }
      .kg-card { margin: 2.5em 0 !important; display: block !important; }
      .kg-bookmark-card { background: #ffffff !important; border: 1px solid #e5e5e5 !important; border-radius: 8px !important; padding: 1rem !important; }
      .kg-bookmark-description { display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }
      .kg-gallery-image img { width: 100% !important; height: auto !important; object-fit: contain !important; }
    `

    const styleElement = document.createElement('style')
    styleElement.id = 'ghost-styles'
    styleElement.textContent = fallbackCSS
    document.head.appendChild(styleElement)

    const fallbackJS = `
      document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.kg-video-large-play-icon').forEach(function(btn) {
          btn.addEventListener('click', function() {
            const video = btn.closest('.kg-video-card').querySelector('video');
            if (video) {
              video.play();
              const overlay = btn.closest('.kg-video-overlay');
              if (overlay) overlay.style.display = 'none';
            }
          });
        });
      });
    `

    const script = document.createElement('script')
    script.id = 'ghost-scripts'
    script.textContent = fallbackJS
    document.head.appendChild(script)

    stylesLoaded.value = true
    console.log('✅ Ghost fallback assets loaded')
  }

  if (process.client) {
    onMounted(async () => {
      await loadGhostStyles()
    })
  }

  return {
    stylesLoaded: readonly(stylesLoaded),
    stylesError: readonly(stylesError),
    isLoading: readonly(isLoading),
    loadGhostStyles
  }
}
