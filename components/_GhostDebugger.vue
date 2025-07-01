<!-- components/GhostDebugger.vue - Temporary debugging component -->
<template>
  <div class="ghost-debugger" v-if="showDebug">
    <div class="debug-panel">
      <h3>🔍 Ghost CSS Debug Panel</h3>
      
      <div class="debug-section">
        <h4>CSS Loading Status</h4>
        <div class="status-grid">
          <div class="status-item">
            <span class="label">Styles Loaded:</span>
            <span :class="stylesLoaded ? 'success' : 'error'">
              {{ stylesLoaded ? '✅ Yes' : '❌ No' }}
            </span>
          </div>
          <div class="status-item">
            <span class="label">Styles Error:</span>
            <span :class="stylesError ? 'error' : 'success'">
              {{ stylesError ? '⚠️ Yes' : '✅ No' }}
            </span>
          </div>
          <div class="status-item">
            <span class="label">Loading:</span>
            <span :class="isLoading ? 'warning' : 'neutral'">
              {{ isLoading ? '🔄 Yes' : '✅ No' }}
            </span>
          </div>
        </div>
      </div>

      <div class="debug-section">
        <h4>CSS Elements Found</h4>
        <div class="css-elements">
          <div class="element-item">
            <span class="label">Ghost Styles:</span>
            <span>{{ ghostStylesCount }}</span>
          </div>
          <div class="element-item">
            <span class="label">Ghost Fallback:</span>
            <span>{{ ghostFallbackCount }}</span>
          </div>
          <div class="element-item">
            <span class="label">UnoCSS Reset:</span>
            <span>{{ unoResetCount }}</span>
          </div>
        </div>
      </div>

      <div class="debug-section">
        <h4>Ghost Content Detection</h4>
        <div class="content-detection">
          <div class="element-item">
            <span class="label">Ghost Content Root:</span>
            <span>{{ ghostContentRootCount }}</span>
          </div>
          <div class="element-item">
            <span class="label">Ghost Isolation:</span>
            <span>{{ ghostIsolationCount }}</span>
          </div>
          <div class="element-item">
            <span class="label">KG Cards:</span>
            <span>{{ kgCardsCount }}</span>
          </div>
        </div>
      </div>

      <div class="debug-section">
        <h4>API Test</h4>
        <button @click="testGhostAPI" class="test-button">
          Test Ghost Styles API
        </button>
        <div v-if="apiTestResult" class="api-result">
          <pre>{{ apiTestResult }}</pre>
        </div>
      </div>

      <div class="debug-section">
        <h4>Quick Actions</h4>
        <div class="actions">
          <button @click="reloadGhostStyles" class="action-button">
            🔄 Reload Ghost CSS
          </button>
          <button @click="toggleDebugMode" class="action-button">
            {{ debugMode ? '👁️ Hide Debug' : '🔍 Show Debug' }}
          </button>
          <button @click="downloadDebugInfo" class="action-button">
            📥 Download Debug Info
          </button>
        </div>
      </div>

      <div class="debug-section" v-if="debugMode">
        <h4>CSS Rules Applied</h4>
        <div class="css-rules">
          <div v-for="rule in appliedCSSRules" :key="rule.selector" class="css-rule">
            <code>{{ rule.selector }}</code>
            <span class="rule-count">{{ rule.count }} rules</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showDebug = ref(process.dev || false)
const debugMode = ref(false)
const apiTestResult = ref('')

// Get Ghost styles status
const { stylesLoaded, stylesError, isLoading, loadGhostStyles } = useGhostStyles()

// Reactive counters for CSS elements
const ghostStylesCount = ref(0)
const ghostFallbackCount = ref(0)
const unoResetCount = ref(0)
const ghostContentRootCount = ref(0)
const ghostIsolationCount = ref(0)
const kgCardsCount = ref(0)
const appliedCSSRules = ref([])

// Update counters
const updateCounters = () => {
  if (process.client) {
    // Count style elements
    ghostStylesCount.value = document.querySelectorAll('#ghost-styles').length
    ghostFallbackCount.value = document.querySelectorAll('#ghost-fallback').length
    unoResetCount.value = document.querySelectorAll('style[data-vite-dev-id*="uno"]').length
    
    // Count content elements
    ghostContentRootCount.value = document.querySelectorAll('.ghost-content-root').length
    ghostIsolationCount.value = document.querySelectorAll('.ghost-content-isolation').length
    kgCardsCount.value = document.querySelectorAll('[class*="kg-"]').length
    
    // Analyze CSS rules
    if (debugMode.value) {
      analyzeCSSRules()
    }
  }
}

const analyzeCSSRules = () => {
  const rules = []
  
  for (let sheet of document.styleSheets) {
    try {
      const cssRules = sheet.cssRules || sheet.rules
      if (cssRules) {
        for (let rule of cssRules) {
          if (rule.selectorText && rule.selectorText.includes('ghost-content')) {
            rules.push({
              selector: rule.selectorText,
              count: rule.style.length
            })
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheet, skip
    }
  }
  
  appliedCSSRules.value = rules.slice(0, 10) // Show first 10
}

const testGhostAPI = async () => {
  try {
    const response = await $fetch('/api/ghost/styles')
    const headers = {
      'Content-Type': response.headers?.['content-type'] || 'unknown',
      'X-Ghost-Source': response.headers?.['x-ghost-source'] || 'unknown',
      'Content-Length': response.length || 0
    }
    
    apiTestResult.value = JSON.stringify({
      success: true,
      headers,
      preview: response.substring(0, 200) + '...'
    }, null, 2)
  } catch (error) {
    apiTestResult.value = JSON.stringify({
      success: false,
      error: error.message
    }, null, 2)
  }
}

const reloadGhostStyles = async () => {
  // Remove existing styles
  document.querySelectorAll('#ghost-styles, #ghost-fallback').forEach(el => el.remove())
  
  // Reload
  await loadGhostStyles()
  updateCounters()
}

const toggleDebugMode = () => {
  debugMode.value = !debugMode.value
  if (debugMode.value) {
    updateCounters()
  }
}

const downloadDebugInfo = () => {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    stylesLoaded: stylesLoaded.value,
    stylesError: stylesError.value,
    isLoading: isLoading.value,
    elements: {
      ghostStyles: ghostStylesCount.value,
      ghostFallback: ghostFallbackCount.value,
      unoReset: unoResetCount.value,
      ghostContentRoot: ghostContentRootCount.value,
      ghostIsolation: ghostIsolationCount.value,
      kgCards: kgCardsCount.value
    },
    cssRules: appliedCSSRules.value,
    stylesheets: Array.from(document.styleSheets).map(sheet => ({
      href: sheet.href,
      disabled: sheet.disabled,
      title: sheet.title
    }))
  }
  
  const blob = new Blob([JSON.stringify(debugInfo, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ghost-debug-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// Update counters on mount and when styles change
onMounted(() => {
  updateCounters()
  
  // Watch for changes
  const observer = new MutationObserver(() => {
    updateCounters()
  })
  
  observer.observe(document.head, {
    childList: true,
    subtree: true
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  })
  
  onUnmounted(() => {
    observer.disconnect()
  })
})

watch([stylesLoaded, stylesError], () => {
  updateCounters()
})
</script>

<style scoped>
.ghost-debugger {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 12px;
}

.debug-panel {
  padding: 1rem;
  max-height: 80vh;
  overflow-y: auto;
}

.debug-panel h3 {
  margin: 0 0 1rem 0;
  font-size: 14px;
  color: #00ff88;
}

.debug-panel h4 {
  margin: 1rem 0 0.5rem 0;
  font-size: 12px;
  color: #88ccff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.debug-section {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
}

.debug-section:last-child {
  border-bottom: none;
}

.status-grid,
.css-elements,
.content-detection {
  display: grid;
  gap: 0.25rem;
}

.status-item,
.element-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}

.label {
  font-weight: 500;
  color: #ccc;
}

.success { color: #00ff88; }
.error { color: #ff4444; }
.warning { color: #ffaa00; }
.neutral { color: #88ccff; }

.test-button,
.action-button {
  background: #0084ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  margin: 0.25rem 0.25rem 0.25rem 0;
  transition: background 0.2s ease;
}

.test-button:hover,
.action-button:hover {
  background: #0066cc;
}

.api-result {
  margin-top: 0.5rem;
  background: #1a1a1a;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #333;
  max-height: 150px;
  overflow-y: auto;
}

.api-result pre {
  margin: 0;
  font-size: 10px;
  line-height: 1.4;
  color: #ccc;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.css-rules {
  max-height: 200px;
  overflow-y: auto;
}

.css-rule {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid #2a2a2a;
}

.css-rule code {
  background: #1a1a1a;
  padding: 0.125rem 0.25rem;
  border-radius: 2px;
  font-size: 10px;
  color: #88ccff;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rule-count {
  color: #ffaa00;
  font-size: 10px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .ghost-debugger {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .debug-panel {
    padding: 0.75rem;
  }
  
  .status-item,
  .element-item {
    font-size: 11px;
  }
}
</style>