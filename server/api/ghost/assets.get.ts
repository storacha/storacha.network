// server/api/ghost/assets.get.ts - FIXED VERSION
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = query.type as string

  const config = useRuntimeConfig()
  const ghostUrl = config.public.ghostUrl

  if (!ghostUrl) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Ghost URL not configured'
    })
  }

  const cleanUrl = ghostUrl.replace(/\/$/, '')

  // Set appropriate headers
  if (type === 'css' || !type) {
    setHeader(event, 'content-type', 'text/css; charset=utf-8')
  } else if (type === 'js') {
    setHeader(event, 'content-type', 'application/javascript; charset=utf-8')
  }
  
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

  try {
    if (type === 'css' || !type) {
      let combinedCSS = ''
      
      // Try to load main theme CSS
      try {
        const screenCSS = await $fetch<string>(`${cleanUrl}/assets/built/screen.css`, {
          timeout: 8000,
          headers: { 'User-Agent': 'Storacha-Ghost-Reader/1.0' }
        })
        
        if (screenCSS && typeof screenCSS === 'string' && screenCSS.length > 100) {
          const cleanedCSS = screenCSS.replace(/\/\*#\s*sourceMappingURL=.*?\*\//g, '')
          combinedCSS += `/* Theme CSS */\n${cleanedCSS}\n\n`
          console.log(`✅ Loaded theme CSS`)
        }
      } catch (error: any) {
        console.warn(`⚠️ Failed to load theme CSS:`, error?.message || String(error))
      }

      // Try to load cards CSS
      try {
        const cardsCSS = await $fetch<string>(`${cleanUrl}/public/cards.min.css`, {
          timeout: 8000,
          headers: { 'User-Agent': 'Storacha-Ghost-Reader/1.0' }
        })
        
        if (cardsCSS && typeof cardsCSS === 'string' && cardsCSS.length > 100) {
          const cleanedCSS = cardsCSS.replace(/\/\*#\s*sourceMappingURL=.*?\*\//g, '')
          combinedCSS += `/* Cards CSS */\n${cleanedCSS}\n\n`
          console.log(`✅ Loaded cards CSS`)
        }
      } catch (error: any) {
        console.warn(`⚠️ Failed to load cards CSS:`, error?.message || String(error))
      }
      
      // Add our fixes
      combinedCSS += getGhostFixes()
      
      // ✅ ALWAYS RETURN STRING
      return combinedCSS || getFallbackCSS()
    }
    
    if (type === 'js') {
      try {
        const cardsJS = await $fetch<string>(`${cleanUrl}/public/cards.min.js`, {
          timeout: 8000,
          headers: { 'User-Agent': 'Storacha-Ghost-Reader/1.0' }
        })
        
        // ✅ ENSURE WE RETURN A STRING
        let jsContent = ''
        
        if (typeof cardsJS === 'string' && cardsJS.length > 100) {
          jsContent = cardsJS.replace(/\/\/#\s*sourceMappingURL=.*$/gm, '')
        }
        
        // Add our JavaScript fixes
        jsContent += getGhostJavaScript()
        
        // ✅ ALWAYS RETURN STRING, NEVER OBJECT
        return jsContent || getFallbackJS()
        
      } catch (error: any) {
        console.warn('Failed to load cards.min.js:', error?.message || String(error))
        // ✅ RETURN FALLBACK STRING
        return getFallbackJS()
      }
    }
    
  } catch (error: any) {
    console.error('Ghost assets error:', error?.message || String(error))
    
    if (type === 'js') {
      return getFallbackJS()
    } else {
      return getFallbackCSS()
    }
  }
})

function getGhostFixes(): string {
  return `
/* GHOST LAYOUT FIXES */

/* 1. Fix Gallery Mosaics - Better Detection */
.kg-gallery-card {
  margin: 2rem 0 !important;
  background: transparent !important;
}

.kg-gallery-container {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
  width: 100% !important;
}

.kg-gallery-row {
  display: flex !important;
  gap: 4px !important;
  width: 100% !important;
  align-items: stretch !important;
}

.kg-gallery-image {
  flex: 1 1 0% !important;
  height: 200px !important;
  overflow: hidden !important;
  border-radius: 8px !important;
  background: #f8f9fa !important;
  margin: 0 !important;
  padding: 0 !important;
}

.kg-gallery-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  display: block !important;
}

/* 2. Fix Twitter Embeds */
.kg-embed-card {
  text-align: center !important;
  width: 100% !important;
  margin: 2rem 0 !important;
  display: block !important;
}

.kg-embed-card .twitter-tweet {
  max-width: 550px !important;
  width: 100% !important;
  margin: 0 auto !important;
  padding: 1.5rem !important;
  border: 1px solid #e1e8ed !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
  display: block !important;
  text-align: left !important;
}

.kg-embed-card iframe[src*="twitter.com"],
.kg-embed-card iframe[src*="x.com"],
.kg-embed-card iframe[src*="platform.twitter.com"] {
  max-width: 550px !important;
  width: 100% !important;
  min-height: 400px !important;
  margin: 0 auto !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
  border: 1px solid #e1e8ed !important;
  display: block !important;
  background: #ffffff !important;
}

/* 3. Fix Video Cards */
.kg-video-card {
  margin: 2rem 0 !important;
  min-height: 350px !important;
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

/* 4. Fix Black Cards */
.kg-header-card,
.kg-feature-card,
.kg-callout-card {
  max-height: 350px !important;
  min-height: auto !important;
  overflow: hidden !important;
  padding: 2rem !important;
  margin: 2rem 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  flex-direction: column !important;
}

/* 5. Fix Bookmark Cards */
.kg-bookmark-card {
  background: #ffffff !important;
  border: 1px solid #e5e5e5 !important;
  border-radius: 12px !important;
  padding: 1.5rem !important;
  margin: 2rem 0 !important;
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

/* 6. Overall spacing */
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
}

/* 7. Remove unwanted backgrounds */
.ghost-content-isolation,
.ghost-content-root,
.ghost-content {
  background: #ffffff !important;
}

/* 8. Mobile responsive */
@media (max-width: 768px) {
  .kg-gallery-image {
    height: 150px !important;
  }
  
  .kg-video-card,
  .kg-video-card video {
    min-height: 250px !important;
  }
  
  .kg-header-card,
  .kg-feature-card {
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
}
`
}

function getGhostJavaScript(): string {
  return `

// GHOST JAVASCRIPT FIXES
(function() {
  console.log('🎨 Ghost JavaScript fixes loading...');
  
  function applyGhostFixes() {
    // Fix gallery layouts
    document.querySelectorAll('.kg-gallery-card').forEach(function(gallery) {
      const container = gallery.querySelector('.kg-gallery-container');
      if (container) {
        container.style.setProperty('display', 'flex', 'important');
        container.style.setProperty('flex-direction', 'column', 'important');
        container.style.setProperty('gap', '4px', 'important');
      }
      
      gallery.querySelectorAll('.kg-gallery-row').forEach(function(row) {
        row.style.setProperty('display', 'flex', 'important');
        row.style.setProperty('gap', '4px', 'important');
        
        const images = row.querySelectorAll('.kg-gallery-image');
        images.forEach(function(img) {
          img.style.setProperty('flex', '1 1 0%', 'important');
          img.style.setProperty('height', '200px', 'important');
          img.style.setProperty('overflow', 'hidden', 'important');
          
          const image = img.querySelector('img');
          if (image) {
            image.style.setProperty('width', '100%', 'important');
            image.style.setProperty('height', '100%', 'important');
            image.style.setProperty('object-fit', 'cover', 'important');
          }
        });
      });
    });
    
    // Fix Twitter embeds
    document.querySelectorAll('.kg-embed-card').forEach(function(embed) {
      embed.style.setProperty('text-align', 'center', 'important');
      
      const tweets = embed.querySelectorAll('.twitter-tweet, iframe[src*="twitter"]');
      tweets.forEach(function(tweet) {
        tweet.style.setProperty('max-width', '550px', 'important');
        tweet.style.setProperty('margin', '0 auto', 'important');
        tweet.style.setProperty('display', 'block', 'important');
      });
    });
    
    // Fix video cards
    document.querySelectorAll('.kg-video-card').forEach(function(video) {
      video.style.setProperty('min-height', '350px', 'important');
      
      const videoEl = video.querySelector('video');
      if (videoEl) {
        videoEl.style.setProperty('min-height', '350px', 'important');
        videoEl.style.setProperty('width', '100%', 'important');
        videoEl.style.setProperty('object-fit', 'cover', 'important');
      }
    });
    
    // Fix black cards
    document.querySelectorAll('.kg-header-card, .kg-feature-card').forEach(function(card) {
      card.style.setProperty('max-height', '350px', 'important');
      card.style.setProperty('overflow', 'hidden', 'important');
      card.style.setProperty('padding', '2rem', 'important');
    });
    
    console.log('✅ Ghost JavaScript fixes applied');
  }
  
  // Apply fixes immediately and on content changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyGhostFixes);
  } else {
    applyGhostFixes();
  }
  
  // Apply fixes when new content is added
  setTimeout(applyGhostFixes, 500);
  setTimeout(applyGhostFixes, 1000);
  setTimeout(applyGhostFixes, 2000);
  
  // Set up observer for dynamic content
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      let needsUpdate = false;
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && (
            node.classList && (
              node.classList.contains('kg-gallery-card') ||
              node.classList.contains('kg-embed-card') ||
              node.classList.contains('kg-video-card') ||
              node.querySelector && node.querySelector('[class*="kg-"]')
            )
          )) {
            needsUpdate = true;
          }
        });
      });
      
      if (needsUpdate) {
        setTimeout(applyGhostFixes, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Video play functionality
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('kg-video-large-play-icon')) {
      const videoCard = e.target.closest('.kg-video-card');
      const video = videoCard && videoCard.querySelector('video');
      if (video) {
        video.play();
        const overlay = videoCard.querySelector('.kg-video-overlay');
        if (overlay) overlay.style.display = 'none';
      }
    }
  });
  
})();
`
}

function getFallbackCSS(): string {
  return `
/* FALLBACK GHOST CSS */
.kg-gallery-container { display: flex !important; flex-direction: column !important; gap: 4px !important; }
.kg-gallery-row { display: flex !important; gap: 4px !important; }
.kg-gallery-image { flex: 1 !important; height: 200px !important; overflow: hidden !important; }
.kg-gallery-image img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
.kg-embed-card { text-align: center !important; }
.kg-embed-card .twitter-tweet, .kg-embed-card iframe[src*="twitter"] { max-width: 550px !important; margin: 0 auto !important; }
.kg-video-card { min-height: 350px !important; }
.kg-header-card, .kg-feature-card { max-height: 350px !important; overflow: hidden !important; }
.kg-card, .kg-embed-card, .kg-gallery-card, .kg-video-card { margin: 2rem 0 !important; }
`
}

function getFallbackJS(): string {
  return `
// FALLBACK GHOST JS
console.log('📦 Ghost fallback JS loaded');
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔧 Applying Ghost fixes...');
  
  // Gallery fixes
  document.querySelectorAll('.kg-gallery-image').forEach(function(img) {
    img.style.flex = '1';
    img.style.height = '200px';
    img.style.overflow = 'hidden';
    const image = img.querySelector('img');
    if (image) {
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.objectFit = 'cover';
    }
  });
  
  // Twitter fixes
  document.querySelectorAll('.kg-embed-card').forEach(function(embed) {
    embed.style.textAlign = 'center';
  });
  
  // Video fixes
  document.querySelectorAll('.kg-video-card').forEach(function(video) {
    video.style.minHeight = '350px';
  });
  
  console.log('✅ Ghost fallback fixes applied');
});
`
}