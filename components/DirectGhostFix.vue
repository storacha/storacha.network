<!-- components/TargetedGhostFixes.vue - Fix specific alignment issues -->
<template>
  <div style="display: none;"></div>
</template>

<script setup>
onMounted(() => {
  console.log('🎯 TargetedGhostFixes: Applying specific fixes...')
  
  // Apply fixes immediately and repeatedly
  applyTargetedFixes()
  setTimeout(applyTargetedFixes, 500)
  setTimeout(applyTargetedFixes, 1000)
  setTimeout(applyTargetedFixes, 2000)
  
  // Set up observer for dynamic content
  setupTargetedObserver()
})

function applyTargetedFixes() {
  if (!process.client) return
  
  console.log('🔧 Applying targeted fixes...')
  
  // Inject targeted CSS
  injectTargetedCSS()
  
  // Apply specific DOM fixes
  fixGalleryAlignment()
  fixBlackCardHeight()
  fixTwitterAlignment()
  fixVideoSize()
  fixOverallSpacing()
}

function injectTargetedCSS() {
  // Remove existing targeted styles
  document.querySelectorAll('#targeted-ghost-fixes').forEach(el => el.remove())
  
  const targetedCSS = `
/* TARGETED GHOST FIXES - ADDRESS SPECIFIC ISSUES */

/* 1. FIX GALLERY MISALIGNMENT - FORCE PROPER FLEX LAYOUT */
.kg-gallery-card .kg-gallery-container {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
  width: 100% !important;
}

.kg-gallery-card .kg-gallery-row {
  display: flex !important;
  gap: 4px !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.kg-gallery-card .kg-gallery-image {
  flex: 1 1 0% !important;
  height: 200px !important;
  min-width: 0 !important;
  overflow: hidden !important;
  border-radius: 8px !important;
  margin: 0 !important;
  padding: 0 !important;
}

.kg-gallery-card .kg-gallery-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  display: block !important;
  border-radius: 8px !important;
}

/* 2. FIX BLACK CARD HEIGHT - REDUCE EXCESSIVE HEIGHT */
.kg-header-card,
.kg-feature-card,
.kg-callout-card {
  max-height: 300px !important;
  min-height: auto !important;
  overflow: hidden !important;
  padding: 2rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;
}

.kg-header-card h1,
.kg-header-card h2,
.kg-feature-card h1,
.kg-feature-card h2,
.kg-callout-card h1,
.kg-callout-card h2 {
  font-size: 1.75rem !important;
  line-height: 1.2 !important;
  margin: 0 0 0.5rem 0 !important;
}

.kg-header-card p,
.kg-feature-card p,
.kg-callout-card p {
  font-size: 1rem !important;
  margin: 0 !important;
  line-height: 1.4 !important;
}

/* 3. FIX TWITTER ALIGNMENT - CENTER AND SIZE PROPERLY */
.kg-embed-card {
  text-align: center !important;
  width: 100% !important;
  display: block !important;
  margin: 2rem 0 !important;
}

.kg-embed-card .twitter-tweet {
  max-width: 550px !important;
  width: 100% !important;
  margin: 0 auto !important;
  display: block !important;
  text-align: left !important;
  padding: 1.5rem !important;
  border: 1px solid #e1e8ed !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.kg-embed-card iframe[src*="twitter.com"],
.kg-embed-card iframe[src*="x.com"],
.kg-embed-card iframe[src*="platform.twitter.com"] {
  max-width: 550px !important;
  width: 100% !important;
  min-height: 400px !important;
  margin: 0 auto !important;
  display: block !important;
  border: 1px solid #e1e8ed !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

/* 4. FIX VIDEO SIZE - ENSURE PROPER DIMENSIONS */
.kg-video-card {
  width: 100% !important;
  min-height: 350px !important;
  margin: 2rem 0 !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  background: #000000 !important;
  position: relative !important;
}

.kg-video-card video {
  width: 100% !important;
  height: auto !important;
  min-height: 350px !important;
  object-fit: cover !important;
  display: block !important;
}

.kg-video-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: rgba(0, 0, 0, 0.3) !important;
}

.kg-video-large-play-icon {
  width: 80px !important;
  height: 80px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.9) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  font-size: 2rem !important;
  color: #000000 !important;
}

/* 5. FIX OVERALL SPACING - CONSISTENT MARGINS */
.kg-card,
.kg-embed-card,
.kg-bookmark-card,
.kg-gallery-card,
.kg-video-card,
.kg-image-card {
  margin: 2rem 0 !important;
  padding: 0 !important;
  display: block !important;
  clear: both !important;
  width: 100% !important;
}

/* Remove top margin from first element */
.ghost-content .kg-card:first-child,
.ghost-content .kg-embed-card:first-child,
.ghost-content-isolation .kg-card:first-child,
.ghost-content-isolation .kg-embed-card:first-child {
  margin-top: 0 !important;
}

/* 6. BOOKMARK CARD IMPROVEMENTS */
.kg-bookmark-card {
  background: #ffffff !important;
  border: 1px solid #e5e5e5 !important;
  border-radius: 12px !important;
  padding: 1.5rem !important;
  display: flex !important;
  gap: 1rem !important;
}

.kg-bookmark-content {
  flex: 1 !important;
}

.kg-bookmark-thumbnail {
  width: 120px !important;
  height: 120px !important;
  flex-shrink: 0 !important;
  overflow: hidden !important;
  border-radius: 8px !important;
}

.kg-bookmark-thumbnail img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* 7. IMAGE CARD IMPROVEMENTS */
.kg-image-card {
  text-align: center !important;
  margin: 2rem 0 !important;
}

.kg-image-card img {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

/* 8. MOBILE RESPONSIVE ADJUSTMENTS */
@media (max-width: 768px) {
  .kg-gallery-image {
    height: 150px !important;
  }
  
  .kg-video-card,
  .kg-video-card video {
    min-height: 250px !important;
  }
  
  .kg-header-card,
  .kg-feature-card,
  .kg-callout-card {
    max-height: 250px !important;
    padding: 1.5rem !important;
  }
  
  .kg-bookmark-card {
    flex-direction: column !important;
  }
  
  .kg-bookmark-thumbnail {
    width: 100% !important;
    height: 200px !important;
  }
  
  .kg-embed-card .twitter-tweet,
  .kg-embed-card iframe[src*="twitter.com"],
  .kg-embed-card iframe[src*="x.com"] {
    max-width: 100% !important;
  }
}

/* 9. FORCE PROPER BACKGROUND COLORS */
.ghost-content-isolation,
.ghost-content-root,
.ghost-content {
  background: #ffffff !important;
}

.kg-card:not(.kg-header-card):not(.kg-feature-card):not(.kg-callout-card),
.kg-embed-card,
.kg-gallery-card {
  background: transparent !important;
}
`

  const styleElement = document.createElement('style')
  styleElement.id = 'targeted-ghost-fixes'
  styleElement.textContent = targetedCSS
  document.head.appendChild(styleElement)
  
  console.log('✅ Targeted CSS injected')
}

function fixGalleryAlignment() {
  document.querySelectorAll('.kg-gallery-card').forEach(gallery => {
    console.log('🖼️ Fixing gallery:', gallery)
    
    // Force container layout
    const container = gallery.querySelector('.kg-gallery-container')
    if (container) {
      container.style.cssText = 'display: flex !important; flex-direction: column !important; gap: 4px !important; width: 100% !important;'
    }
    
    // Fix each row
    gallery.querySelectorAll('.kg-gallery-row').forEach(row => {
      row.style.cssText = 'display: flex !important; gap: 4px !important; width: 100% !important; margin: 0 !important; padding: 0 !important;'
      
      // Fix images in this row
      const images = row.querySelectorAll('.kg-gallery-image')
      images.forEach(imageContainer => {
        imageContainer.style.cssText = 'flex: 1 1 0% !important; height: 200px !important; overflow: hidden !important; border-radius: 8px !important; margin: 0 !important; padding: 0 !important;'
        
        const img = imageContainer.querySelector('img')
        if (img) {
          img.style.cssText = 'width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center !important; display: block !important;'
        }
      })
    })
  })
}

function fixBlackCardHeight() {
  const blackCardSelectors = ['.kg-header-card', '.kg-feature-card', '.kg-callout-card']
  
  blackCardSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(card => {
      console.log('⚫ Fixing black card:', card)
      
      card.style.cssText = 'max-height: 300px !important; min-height: auto !important; overflow: hidden !important; padding: 2rem !important; display: flex !important; align-items: center !important; justify-content: center !important; flex-direction: column !important; margin: 2rem 0 !important;'
      
      // Fix text sizing
      const headings = card.querySelectorAll('h1, h2, h3')
      headings.forEach(h => {
        h.style.cssText = 'font-size: 1.75rem !important; line-height: 1.2 !important; margin: 0 0 0.5rem 0 !important;'
      })
      
      const paragraphs = card.querySelectorAll('p')
      paragraphs.forEach(p => {
        p.style.cssText = 'font-size: 1rem !important; margin: 0 !important; line-height: 1.4 !important;'
      })
    })
  })
}

function fixTwitterAlignment() {
  document.querySelectorAll('.kg-embed-card').forEach(embedCard => {
    console.log('🐦 Fixing Twitter embed:', embedCard)
    
    embedCard.style.cssText = 'text-align: center !important; width: 100% !important; display: block !important; margin: 2rem 0 !important;'
    
    // Fix Twitter blockquotes
    const tweets = embedCard.querySelectorAll('.twitter-tweet')
    tweets.forEach(tweet => {
      tweet.style.cssText = 'max-width: 550px !important; width: 100% !important; margin: 0 auto !important; display: block !important; text-align: left !important; padding: 1.5rem !important; border: 1px solid #e1e8ed !important; border-radius: 12px !important; background: #ffffff !important;'
    })
    
    // Fix Twitter iframes
    const iframes = embedCard.querySelectorAll('iframe[src*="twitter.com"], iframe[src*="x.com"]')
    iframes.forEach(iframe => {
      iframe.style.cssText = 'max-width: 550px !important; width: 100% !important; min-height: 400px !important; margin: 0 auto !important; display: block !important; border: 1px solid #e1e8ed !important; border-radius: 12px !important; background: #ffffff !important;'
    })
  })
}

function fixVideoSize() {
  document.querySelectorAll('.kg-video-card').forEach(videoCard => {
    console.log('🎥 Fixing video card:', videoCard)
    
    videoCard.style.cssText = 'width: 100% !important; min-height: 350px !important; margin: 2rem 0 !important; border-radius: 12px !important; overflow: hidden !important; background: #000000 !important; position: relative !important;'
    
    const video = videoCard.querySelector('video')
    if (video) {
      video.style.cssText = 'width: 100% !important; height: auto !important; min-height: 350px !important; object-fit: cover !important; display: block !important;'
    }
    
    const playIcon = videoCard.querySelector('.kg-video-large-play-icon')
    if (playIcon) {
      playIcon.style.cssText = 'width: 80px !important; height: 80px !important; border-radius: 50% !important; background: rgba(255, 255, 255, 0.9) !important; display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; font-size: 2rem !important; color: #000000 !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;'
      
      playIcon.addEventListener('click', () => {
        if (video) {
          video.play()
          const overlay = videoCard.querySelector('.kg-video-overlay')
          if (overlay) overlay.style.display = 'none'
        }
      })
    }
  })
}

function fixOverallSpacing() {
  const cardSelectors = [
    '.kg-card',
    '.kg-embed-card',
    '.kg-bookmark-card', 
    '.kg-gallery-card',
    '.kg-video-card',
    '.kg-image-card'
  ]
  
  cardSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(card => {
      // Apply consistent spacing
      const currentMargin = card.style.margin
      if (!currentMargin.includes('2rem 0')) {
        card.style.margin = '2rem 0'
        card.style.padding = '0'
        card.style.display = 'block'
        card.style.clear = 'both'
        card.style.width = '100%'
      }
    })
  })
  
  console.log('📏 Overall spacing fixed')
}

function setupTargetedObserver() {
  if (!process.client || !window.MutationObserver) return
  
  const observer = new MutationObserver(mutations => {
    let needsUpdate = false
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && (
            node.classList?.contains('kg-gallery-card') ||
            node.classList?.contains('kg-embed-card') ||
            node.classList?.contains('kg-video-card') ||
            node.classList?.contains('kg-header-card') ||
            node.querySelector?.('[class*="kg-"]')
          )) {
            needsUpdate = true
          }
        })
      }
    })
    
    if (needsUpdate) {
      console.log('🔄 Content changed, reapplying targeted fixes...')
      setTimeout(applyTargetedFixes, 100)
    }
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  console.log('👁️ Targeted observer setup complete')
}
</script>