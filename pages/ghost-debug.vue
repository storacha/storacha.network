<!-- pages/ghost-debug.vue - Dedicated debug page -->
<script setup>
useHead({
  title: 'Ghost CSS Debug Page'
})

const testResults = ref([])
const isRunning = ref(false)

function addResult(title, status, details) {
  testResults.value.push({
    id: Date.now(),
    title,
    status,
    details,
    timestamp: new Date().toLocaleTimeString()
  })
}

async function runDiagnostics() {
  isRunning.value = true
  testResults.value = []
  
  // Test 1: Check if we're on right page
  addResult(
    'Page Check',
    window.location.pathname.includes('/ghost') ? 'success' : 'warning',
    `Current page: ${window.location.pathname}`
  )
  
  // Test 2: Test CSS API
  try {
    const cssResponse = await $fetch('/api/ghost/assets?type=css')
    const hasTwitter = cssResponse.includes('.twitter-tweet') || cssResponse.includes('kg-embed-card')
    const hasGallery = cssResponse.includes('.kg-gallery')
    
    addResult(
      'CSS API Test',
      'success',
      `✅ Working - ${(cssResponse.length / 1024).toFixed(2)} KB
      Twitter styles: ${hasTwitter ? '✅' : '❌'}
      Gallery styles: ${hasGallery ? '✅' : '❌'}`
    )
  } catch (error) {
    addResult('CSS API Test', 'error', `❌ Failed: ${error.message}`)
  }
  
  // Test 3: Test JS API
  try {
    const jsResponse = await $fetch('/api/ghost/assets?type=js')
    addResult(
      'JS API Test',
      'success',
      `✅ Working - ${(jsResponse.length / 1024).toFixed(2)} KB`
    )
  } catch (error) {
    addResult('JS API Test', 'error', `❌ Failed: ${error.message}`)
  }
  
  // Test 4: Check CSS in page
  const ghostStyles = document.getElementById('ghost-styles')
  const ghostFallback = document.getElementById('ghost-fallback')
  const allStyles = document.querySelectorAll('style')
  
  addResult(
    'CSS Loading Check',
    ghostStyles ? 'success' : 'error',
    `Ghost styles: ${ghostStyles ? '✅ Found' : '❌ Missing'}
    Ghost fallback: ${ghostFallback ? '✅ Found' : '❌ Missing'}
    Total styles: ${allStyles.length}`
  )
  
  // Test 5: Check Ghost elements
  const ghostContent = document.querySelectorAll('.ghost-content, .ghost-content-isolation')
  const kgCards = document.querySelectorAll('[class*="kg-"]')
  const twitterEmbeds = document.querySelectorAll('.twitter-tweet, iframe[src*="twitter.com"]')
  
  addResult(
    'Ghost Elements Check',
    kgCards.length > 0 ? 'success' : 'warning',
    `Ghost containers: ${ghostContent.length}
    KG elements: ${kgCards.length}
    Twitter embeds: ${twitterEmbeds.length}`
  )
  
  // Test 6: Direct Ghost CSS test
  try {
    const directResponse = await fetch('https://storacha-blog.ghost.io/assets/css/screen.css')
    const directCSS = await directResponse.text()
    const ghostClasses = (directCSS.match(/\.kg-/g) || []).length
    
    addResult(
      'Direct Ghost CSS',
      'success',
      `✅ Direct access working
      Size: ${(directCSS.length / 1024).toFixed(2)} KB
      Ghost classes: ${ghostClasses}`
    )
  } catch (error) {
    addResult('Direct Ghost CSS', 'error', `❌ Failed: ${error.message}`)
  }
  
  isRunning.value = false
}

function injectEmergencyFix() {
  // Remove existing fix
  document.querySelectorAll('#emergency-fix').forEach(el => el.remove())
  
  // Inject emergency CSS
  const style = document.createElement('style')
  style.id = 'emergency-fix'
  style.textContent = `
    /* EMERGENCY GHOST FIXES */
    .ghost-content-isolation,
    .ghost-content-root,
    .ghost-content {
      background: #ffffff !important;
    }
    
    .kg-card,
    .kg-embed-card,
    .kg-gallery-card,
    .kg-video-card {
      margin: 2rem 0 !important;
      padding: 0 !important;
      background: transparent !important;
      display: block !important;
    }
    
    .kg-embed-card {
      text-align: center !important;
      width: 100% !important;
    }
    
    .kg-embed-card .twitter-tweet {
      max-width: 550px !important;
      margin: 0 auto !important;
      padding: 1.5rem !important;
      border: 1px solid #e1e8ed !important;
      border-radius: 12px !important;
      background: #ffffff !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
    }
    
    .kg-embed-card iframe[src*="twitter.com"],
    .kg-embed-card iframe[src*="x.com"] {
      max-width: 550px !important;
      width: 100% !important;
      margin: 0 auto !important;
      min-height: 500px !important;
      border: 1px solid #e1e8ed !important;
      border-radius: 12px !important;
    }
    
    .kg-gallery-container {
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
    }
    
    .kg-gallery-row {
      display: flex !important;
      gap: 4px !important;
    }
    
    .kg-gallery-image {
      flex: 1 !important;
      height: 200px !important;
      overflow: hidden !important;
      border-radius: 8px !important;
    }
    
    .kg-gallery-image img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
    }
    
    .kg-video-card {
      min-height: 300px !important;
      border-radius: 12px !important;
    }
    
    .kg-header-card,
    .kg-feature-card {
      max-height: 400px !important;
      padding: 2rem !important;
    }
  `
  
  document.head.appendChild(style)
  
  addResult('Emergency Fix', 'success', '💉 Emergency CSS injected')
}

onMounted(() => {
  // Auto-run diagnostics
  setTimeout(runDiagnostics, 1000)
})
</script>

<template>
  <div class="debug-page">
    <div class="debug-container">
      <h1>🔍 Ghost CSS Debug Center</h1>
      <p>This page will help us figure out why Ghost CSS isn't working properly.</p>
      
      <div class="debug-actions">
        <button @click="runDiagnostics" :disabled="isRunning" class="btn primary">
          {{ isRunning ? '🔄 Running...' : '🚀 Run Diagnostics' }}
        </button>
        <button @click="injectEmergencyFix" class="btn secondary">
          💉 Inject Emergency Fix
        </button>
        <NuxtLink to="/ghost" class="btn tertiary">
          📝 Go to Ghost Blog
        </NuxtLink>
      </div>
      
      <div v-if="testResults.length > 0" class="results">
        <h2>📊 Test Results</h2>
        <div 
          v-for="result in testResults" 
          :key="result.id" 
          class="result-item"
          :class="result.status"
        >
          <div class="result-header">
            <h3>{{ result.title }}</h3>
            <span class="timestamp">{{ result.timestamp }}</span>
          </div>
          <div class="result-details">
            <pre>{{ result.details }}</pre>
          </div>
        </div>
      </div>
      
      <div class="instructions">
        <h2>📋 Instructions</h2>
        <ol>
          <li><strong>Run the diagnostics</strong> to see what's working and what's broken</li>
          <li><strong>Check the test results</strong> above - any ❌ errors show the problem</li>
          <li><strong>Try the emergency fix</strong> if you want to see immediate results</li>
          <li><strong>Go to a Ghost blog page</strong> to test with actual content</li>
          <li><strong>Share the results</strong> with me so I can create the proper fix</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
}

.debug-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #15171a;
  margin-bottom: 1rem;
  text-align: center;
}

.debug-actions {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: #0084ff;
  color: white;
}

.btn.primary:hover:not(:disabled) {
  background: #0066cc;
  transform: translateY(-1px);
}

.btn.secondary {
  background: #28a745;
  color: white;
}

.btn.secondary:hover {
  background: #218838;
  transform: translateY(-1px);
}

.btn.tertiary {
  background: #6c757d;
  color: white;
}

.btn.tertiary:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

.results {
  margin: 2rem 0;
}

.result-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #6c757d;
}

.result-item.success {
  background: #d4edda;
  border-left-color: #28a745;
}

.result-item.error {
  background: #f8d7da;
  border-left-color: #dc3545;
}

.result-item.warning {
  background: #fff3cd;
  border-left-color: #ffc107;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.result-header h3 {
  margin: 0;
  font-size: 1rem;
}

.timestamp {
  font-size: 0.8rem;
  color: #6c757d;
  font-family: monospace;
}

.result-details pre {
  margin: 0;
  font-size: 0.9rem;
  white-space: pre-wrap;
  line-height: 1.4;
  color: #495057;
}

.instructions {
  background: #e9ecef;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.instructions h2 {
  margin-top: 0;
  color: #495057;
}

.instructions ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.instructions li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .debug-page {
    padding: 1rem;
  }
  
  .debug-container {
    padding: 1rem;
  }
  
  .debug-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>