<!-- components/EnhancedGhostDebugger.vue - COMPLETE SOLUTION -->
<template>
  <div class="ghost-debugger" v-if="showDebugger">
    <div class="debugger-header">
      <h3>🔬 Enhanced Ghost Debugger</h3>
      <div class="header-controls">
        <button @click="minimized = !minimized" class="btn">
          {{ minimized ? '📖' : '📕' }}
        </button>
        <button @click="showDebugger = false" class="btn">✕</button>
      </div>
    </div>
    
    <div v-if="!minimized" class="debugger-content">
      <!-- Status Overview -->
      <div class="section">
        <h4>🎯 System Status</h4>
        <div class="status-grid">
          <div class="status-item" :class="getStatusClass(apiStatus.css)">
            <span class="status-dot"></span>
            <span>CSS API: {{ apiStatus.css }}</span>
          </div>
          <div class="status-item" :class="getStatusClass(apiStatus.js)">
            <span class="status-dot"></span>
            <span>JS API: {{ apiStatus.js }}</span>
          </div>
          <div class="status-item" :class="getStatusClass(layoutStatus)">
            <span class="status-dot"></span>
            <span>Layout: {{ layoutStatus }}</span>
          </div>
          <div class="status-item" :class="getStatusClass(contentStatus)">
            <span class="status-dot"></span>
            <span>Content: {{ contentStatus }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <h4>⚡ Quick Actions</h4>
        <div class="actions">
          <button @click="runFullDiagnostics" class="action-btn primary" :disabled="isRunning">
            {{ isRunning ? '🔄 Running...' : '🔍 Full Scan' }}
          </button>
          <button @click="fixAllIssues" class="action-btn success" :disabled="issues.length === 0">
            🚀 Fix All ({{ issues.length }})
          </button>
          <button @click="testAPIs" class="action-btn warning">
            🔧 Test APIs
          </button>
          <button @click="exportReport" class="action-btn secondary">
            📤 Export Report
          </button>
        </div>
      </div>

      <!-- API Test Results -->
      <div class="section">
        <h4>🔗 API Status</h4>
        <div class="api-results">
          <div class="api-test">
            <div class="api-header">
              <span class="api-name">CSS API</span>
              <span class="api-status" :class="getStatusClass(apiStatus.css)">
                {{ apiStatus.css }}
              </span>
            </div>
            <div v-if="apiResults.css" class="api-details">
              <div class="api-metric">
                <span>Size:</span>
                <span>{{ apiResults.css.size }}</span>
              </div>
              <div class="api-metric">
                <span>Type:</span>
                <span>{{ apiResults.css.type }}</span>
              </div>
              <div class="api-metric">
                <span>Ghost Classes:</span>
                <span>{{ apiResults.css.ghostClasses }}</span>
              </div>
              <div v-if="apiResults.css.error" class="error-text">
                {{ apiResults.css.error }}
              </div>
            </div>
          </div>
          
          <div class="api-test">
            <div class="api-header">
              <span class="api-name">JS API</span>
              <span class="api-status" :class="getStatusClass(apiStatus.js)">
                {{ apiStatus.js }}
              </span>
            </div>
            <div v-if="apiResults.js" class="api-details">
              <div class="api-metric">
                <span>Size:</span>
                <span>{{ apiResults.js.size }}</span>
              </div>
              <div class="api-metric">
                <span>Type:</span>
                <span>{{ apiResults.js.type }}</span>
              </div>
              <div class="api-metric">
                <span>Working:</span>
                <span>{{ apiResults.js.working ? '✅' : '❌' }}</span>
              </div>
              <div v-if="apiResults.js.error" class="error-text">
                {{ apiResults.js.error }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Element Analysis -->
      <div class="section">
        <h4>🎯 Element Analysis</h4>
        <div class="element-grid">
          <div class="element-card">
            <div class="element-icon">🖼️</div>
            <div class="element-count">{{ elementCounts.galleries }}</div>
            <div class="element-label">Galleries</div>
            <div class="element-issues">{{ getElementIssues('gallery') }} issues</div>
          </div>
          <div class="element-card">
            <div class="element-icon">🐦</div>
            <div class="element-count">{{ elementCounts.twitter }}</div>
            <div class="element-label">Twitter</div>
            <div class="element-issues">{{ getElementIssues('twitter') }} issues</div>
          </div>
          <div class="element-card">
            <div class="element-icon">🎥</div>
            <div class="element-count">{{ elementCounts.videos }}</div>
            <div class="element-label">Videos</div>
            <div class="element-issues">{{ getElementIssues('video') }} issues</div>
          </div>
          <div class="element-card">
            <div class="element-icon">⚫</div>
            <div class="element-count">{{ elementCounts.blackCards }}</div>
            <div class="element-label">Black Cards</div>
            <div class="element-issues">{{ getElementIssues('black') }} issues</div>
          </div>
          <div class="element-card">
            <div class="element-icon">🔖</div>
            <div class="element-count">{{ elementCounts.bookmarks }}</div>
            <div class="element-label">Bookmarks</div>
            <div class="element-issues">{{ getElementIssues('bookmark') }} issues</div>
          </div>
        </div>
      </div>

      <!-- Issues List -->
      <div v-if="issues.length > 0" class="section">
        <h4>⚠️ Issues Found ({{ issues.length }})</h4>
        <div class="issues-list">
          <div v-for="issue in issues" :key="issue.id" class="issue-item" :class="issue.severity">
            <div class="issue-header">
              <span class="issue-icon">{{ getIssueIcon(issue.type) }}</span>
              <span class="issue-title">{{ issue.title }}</span>
              <div class="issue-actions">
                <button @click="fixIssue(issue)" class="fix-btn">Fix</button>
                <button @click="highlightElement(issue.element)" class="highlight-btn">Show</button>
              </div>
            </div>
            <div class="issue-description">{{ issue.description }}</div>
            <div v-if="issue.suggestion" class="issue-suggestion">
              💡 {{ issue.suggestion }}
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="section">
        <h4>📊 Performance Metrics</h4>
        <div class="metrics-grid">
          <div class="metric">
            <span class="metric-label">Total Elements</span>
            <span class="metric-value">{{ getTotalElements() }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Issues Fixed</span>
            <span class="metric-value">{{ fixedCount }}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Page Load</span>
            <span class="metric-value">{{ pageLoadTime }}ms</span>
          </div>
          <div class="metric">
            <span class="metric-label">Last Scan</span>
            <span class="metric-value">{{ lastScanTime }}</span>
          </div>
        </div>
      </div>

      <!-- Live CSS Editor -->
      <div class="section">
        <h4>💻 Live CSS Editor</h4>
        <div class="css-editor">
          <div class="editor-tabs">
            <button 
              @click="activeTab = 'custom'" 
              :class="{ active: activeTab === 'custom' }"
              class="tab-btn"
            >
              Custom CSS
            </button>
            <button 
              @click="activeTab = 'presets'" 
              :class="{ active: activeTab === 'presets' }"
              class="tab-btn"
            >
              Presets
            </button>
          </div>
          
          <div v-if="activeTab === 'custom'" class="tab-content">
            <textarea 
              v-model="customCSS" 
              placeholder="Enter custom CSS..."
              class="css-textarea"
              rows="4"
            ></textarea>
            <div class="editor-actions">
              <button @click="applyCSSTest" class="apply-btn">Apply</button>
              <button @click="clearCSS" class="clear-btn">Clear</button>
              <button @click="saveCSS" class="save-btn">Save</button>
            </div>
          </div>
          
          <div v-if="activeTab === 'presets'" class="tab-content">
            <div class="preset-list">
              <button 
                v-for="preset in cssPresets" 
                :key="preset.name"
                @click="applyPreset(preset)"
                class="preset-btn"
              >
                {{ preset.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Debug Log -->
      <div class="section">
        <h4>📝 Debug Log</h4>
        <div class="log-controls">
          <button @click="clearLogs" class="clear-logs-btn">Clear Logs</button>
          <select v-model="logLevel" class="log-level-select">
            <option value="all">All</option>
            <option value="error">Errors Only</option>
            <option value="success">Success Only</option>
          </select>
        </div>
        <div class="log-box">
          <div 
            v-for="log in filteredLogs" 
            :key="log.id" 
            class="log-entry" 
            :class="log.type"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-icon">{{ getLogIcon(log.type) }}</span>
            <span class="log-msg">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Toggle Button -->
  <div v-if="!showDebugger" class="debug-toggle" @click="showDebugger = true">
    <span class="toggle-icon">🔬</span>
    <span class="toggle-badge" v-if="issues.length > 0">{{ issues.length }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// State
const showDebugger = ref(true)
const minimized = ref(false)
const isRunning = ref(false)
const activeTab = ref('custom')
const customCSS = ref('')
const logLevel = ref('all')

// Data
const logs = ref([])
const issues = ref([])
const fixedCount = ref(0)
const pageLoadTime = ref(0)
const lastScanTime = ref('')

const apiStatus = ref({
  css: 'unknown',
  js: 'unknown'
})

const apiResults = ref({
  css: null,
  js: null
})

const elementCounts = ref({
  galleries: 0,
  twitter: 0,
  videos: 0,
  blackCards: 0,
  bookmarks: 0
})

// CSS Presets
const cssPresets = ref([
  {
    name: 'Gallery Fix',
    css: `
.kg-gallery-container {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
}
.kg-gallery-row {
  display: flex !important;
  gap: 6px !important;
}
.kg-gallery-image {
  flex: 1 !important;
  height: 220px !important;
  overflow: hidden !important;
}
.kg-gallery-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}`
  },
  {
    name: 'Twitter Center',
    css: `
.kg-embed-card {
  text-align: center !important;
}
.kg-embed-card .twitter-tweet,
.kg-embed-card iframe[src*="twitter"] {
  max-width: 580px !important;
  margin: 0 auto !important;
  border-radius: 16px !important;
}`
  },
  {
    name: 'Video Enhance',
    css: `
.kg-video-card {
  min-height: 400px !important;
  border-radius: 16px !important;
  overflow: hidden !important;
}
.kg-video-card video {
  object-fit: cover !important;
}`
  }
])

// Computed
const layoutStatus = computed(() => {
  const totalIssues = issues.value.length
  if (totalIssues === 0) return 'good'
  if (totalIssues <= 2) return 'warning' 
  return 'error'
})

const contentStatus = computed(() => {
  const totalElements = getTotalElements()
  if (totalElements === 0) return 'empty'
  if (totalElements > 0) return 'good'
  return 'unknown'
})

const filteredLogs = computed(() => {
  if (logLevel.value === 'all') return logs.value.slice(-10)
  return logs.value.filter(log => log.type === logLevel.value).slice(-10)
})

// Methods
function addLog(message, type = 'info') {
  logs.value.push({
    id: Date.now() + Math.random(),
    time: new Date().toLocaleTimeString(),
    message,
    type
  })
}

function getStatusClass(status) {
  switch(status) {
    case 'good': 
    case 'working': 
    case 'success': 
      return 'status-success'
    case 'warning': 
      return 'status-warning'
    case 'error': 
    case 'failed': 
      return 'status-error'
    default: 
      return 'status-unknown'
  }
}

function getIssueIcon(type) {
  const icons = {
    gallery: '🖼️',
    twitter: '🐦', 
    video: '🎥',
    black: '⚫',
    bookmark: '🔖',
    spacing: '📏',
    layout: '📐'
  }
  return icons[type] || '⚠️'
}

function getLogIcon(type) {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }
  return icons[type] || 'ℹ️'
}

function getElementIssues(type) {
  return issues.value.filter(issue => issue.type.includes(type)).length
}

function getTotalElements() {
  return Object.values(elementCounts.value).reduce((a, b) => a + b, 0)
}

async function testAPIs() {
  addLog('Testing APIs...', 'info')
  
  // Test CSS API
  try {
    const cssResponse = await $fetch('/api/ghost/assets?type=css')
    const cssSize = cssResponse?.length || 0
    const cssType = typeof cssResponse
    const ghostClasses = (cssResponse?.match(/\.kg-/g) || []).length
    
    apiResults.value.css = {
      size: `${(cssSize / 1024).toFixed(2)} KB`,
      type: cssType,
      ghostClasses,
      working: cssType === 'string' && cssSize > 1000
    }
    
    apiStatus.value.css = apiResults.value.css.working ? 'working' : 'failed'
    addLog(`CSS API: ${apiStatus.value.css} (${apiResults.value.css.size})`, 
           apiStatus.value.css === 'working' ? 'success' : 'error')
    
  } catch (error) {
    apiResults.value.css = { error: error.message, working: false }
    apiStatus.value.css = 'error'
    addLog(`CSS API failed: ${error.message}`, 'error')
  }
  
  // Test JS API
  try {
    const jsResponse = await $fetch('/api/ghost/assets?type=js')
    const jsSize = jsResponse?.length || 0
    const jsType = typeof jsResponse
    
    apiResults.value.js = {
      size: `${(jsSize / 1024).toFixed(2)} KB`,
      type: jsType,
      working: jsType === 'string' && jsSize > 100
    }
    
    apiStatus.value.js = apiResults.value.js.working ? 'working' : 'failed'
    addLog(`JS API: ${apiStatus.value.js} (${apiResults.value.js.size})`, 
           apiStatus.value.js === 'working' ? 'success' : 'error')
    
    // Try to inject the JS for testing
    if (apiResults.value.js.working) {
      document.querySelectorAll('#test-js-script').forEach(el => el.remove())
      
      const script = document.createElement('script')
      script.id = 'test-js-script'
      script.textContent = jsResponse
      document.head.appendChild(script)
      
      addLog('JS injected successfully', 'success')
    }
    
  } catch (error) {
    apiResults.value.js = { error: error.message, working: false }
    apiStatus.value.js = 'error'
    addLog(`JS API failed: ${error.message}`, 'error')
  }
}

async function runFullDiagnostics() {
  if (isRunning.value) return
  
  isRunning.value = true
  addLog('Starting full diagnostics...', 'info')
  
  const startTime = performance.now()
  
  try {
    // Clear previous results
    issues.value = []
    
    // Test APIs first
    await testAPIs()
    
    // Count elements
    countElements()
    
    // Analyze issues
    analyzeGalleries()
    analyzeTwitterEmbeds()
    analyzeVideoCards()
    analyzeBlackCards()
    analyzeBookmarkCards()
    analyzeSpacing()
    
    const endTime = performance.now()
    const scanTime = Math.round(endTime - startTime)
    
    lastScanTime.value = new Date().toLocaleTimeString()
    addLog(`Scan completed in ${scanTime}ms. Found ${issues.value.length} issues.`, 'success')
    
  } catch (error) {
    addLog(`Diagnostics failed: ${error.message}`, 'error')
  } finally {
    isRunning.value = false
  }
}

function countElements() {
  elementCounts.value = {
    galleries: document.querySelectorAll('.kg-gallery-card').length,
    twitter: document.querySelectorAll('.kg-embed-card').length,
    videos: document.querySelectorAll('.kg-video-card').length,
    blackCards: document.querySelectorAll('.kg-header-card, .kg-feature-card, .kg-callout-card').length,
    bookmarks: document.querySelectorAll('.kg-bookmark-card').length
  }
  
  addLog(`Elements found: ${getTotalElements()} total`, 'info')
}

function analyzeGalleries() {
  const galleries = document.querySelectorAll('.kg-gallery-card')
  
  galleries.forEach((gallery, index) => {
    const container = gallery.querySelector('.kg-gallery-container')
    if (container) {
      const containerStyle = window.getComputedStyle(container)
      if (containerStyle.display !== 'flex') {
        issues.value.push({
          id: `gallery-container-${index}`,
          type: 'gallery',
          severity: 'high',
          title: 'Gallery Layout Broken',
          description: 'Gallery container not using flex layout',
          suggestion: 'Apply flex display to container',
          element: gallery,
          fix: () => {
            container.style.setProperty('display', 'flex', 'important')
            container.style.setProperty('flex-direction', 'column', 'important')
            container.style.setProperty('gap', '6px', 'important')
          }
        })
      }
    }
    
    // Check gallery images
    const images = gallery.querySelectorAll('.kg-gallery-image')
    let flexIssues = 0
    
    images.forEach(img => {
      const imgStyle = window.getComputedStyle(img)
      if (!imgStyle.flex.includes('1') || imgStyle.height === 'auto') {
        flexIssues++
      }
    })
    
    if (flexIssues > 0) {
      issues.value.push({
        id: `gallery-images-${index}`,
        type: 'gallery',
        severity: 'medium',
        title: 'Gallery Images Misaligned',
        description: `${flexIssues} images not using proper flex sizing`,
        suggestion: 'Apply consistent flex and height properties',
        element: gallery,
        fix: () => {
          images.forEach(img => {
            img.style.setProperty('flex', '1 1 0%', 'important')
            img.style.setProperty('height', '220px', 'important')
            img.style.setProperty('overflow', 'hidden', 'important')
            
            const image = img.querySelector('img')
            if (image) {
              image.style.setProperty('width', '100%', 'important')
              image.style.setProperty('height', '100%', 'important')
              image.style.setProperty('object-fit', 'cover', 'important')
            }
          })
        }
      })
    }
  })
}

function analyzeTwitterEmbeds() {
  const embeds = document.querySelectorAll('.kg-embed-card')
  
  embeds.forEach((embed, index) => {
    const style = window.getComputedStyle(embed)
    if (style.textAlign !== 'center') {
      issues.value.push({
        id: `twitter-alignment-${index}`,
        type: 'twitter',
        severity: 'medium',
        title: 'Twitter Embed Not Centered',
        description: 'Twitter embed not properly centered',
        suggestion: 'Apply center alignment and proper styling',
        element: embed,
        fix: () => {
          embed.style.setProperty('text-align', 'center', 'important')
          
          const tweets = embed.querySelectorAll('.twitter-tweet, iframe[src*="twitter"]')
          tweets.forEach(tweet => {
            tweet.style.setProperty('max-width', '580px', 'important')
            tweet.style.setProperty('margin', '0 auto', 'important')
            tweet.style.setProperty('display', 'block', 'important')
            tweet.style.setProperty('border-radius', '16px', 'important')
          })
        }
      })
    }
  })
}

function analyzeVideoCards() {
  const videos = document.querySelectorAll('.kg-video-card')
  
  videos.forEach((video, index) => {
    const style = window.getComputedStyle(video)
    const height = parseInt(style.height) || parseInt(style.minHeight) || 0
    
    if (height < 350) {
      issues.value.push({
        id: `video-size-${index}`,
        type: 'video',
        severity: 'medium',
        title: 'Video Card Too Small',
        description: `Video card height is ${height}px (should be 400px+)`,
        suggestion: 'Increase minimum height for better visibility',
        element: video,
        fix: () => {
          video.style.setProperty('min-height', '400px', 'important')
          video.style.setProperty('border-radius', '16px', 'important')
          
          const videoEl = video.querySelector('video')
          if (videoEl) {
            videoEl.style.setProperty('min-height', '400px', 'important')
            videoEl.style.setProperty('object-fit', 'cover', 'important')
          }
        }
      })
    }
  })
}

function analyzeBlackCards() {
  const cards = document.querySelectorAll('.kg-header-card, .kg-feature-card, .kg-callout-card')
  
  cards.forEach((card, index) => {
    const style = window.getComputedStyle(card)
    const height = parseInt(style.height) || 0
    
    if (height > 400) {
      issues.value.push({
        id: `black-card-${index}`,
        type: 'black',
        severity: 'low',
        title: 'Black Card Too Tall',
        description: `Card height is ${height}px (should be under 320px)`,
        suggestion: 'Reduce height and add overflow hidden',
        element: card,
        fix: () => {
          card.style.setProperty('max-height', '320px', 'important')
          card.style.setProperty('overflow', 'hidden', 'important')
          card.style.setProperty('padding', '2.5rem', 'important')
          card.style.setProperty('border-radius', '16px', 'important')
        }
      })
    }
  })
}

function analyzeBookmarkCards() {
  const bookmarks = document.querySelectorAll('.kg-bookmark-card')
  
  bookmarks.forEach((bookmark, index) => {
    const style = window.getComputedStyle(bookmark)
    if (style.display !== 'flex') {
      issues.value.push({
        id: `bookmark-layout-${index}`,
        type: 'bookmark',
        severity: 'low',
        title: 'Bookmark Card Layout',
        description: 'Bookmark card not using flex layout',
        suggestion: 'Apply flex layout for better alignment',
        element: bookmark,
        fix: () => {
          bookmark.style.setProperty('display', 'flex', 'important')
          bookmark.style.setProperty('gap', '1.5rem', 'important')
          bookmark.style.setProperty('padding', '1.5rem', 'important')
          bookmark.style.setProperty('border-radius', '16px', 'important')
        }
      })
    }
  })
}

function analyzeSpacing() {
  const cards = document.querySelectorAll('.kg-card, .kg-embed-card, .kg-gallery-card, .kg-video-card')
  let spacingIssues = 0
  
  cards.forEach(card => {
    const style = window.getComputedStyle(card)
    const marginTop = parseInt(style.marginTop) || 0
    const marginBottom = parseInt(style.marginBottom) || 0
    
    if (marginTop < 30 || marginBottom < 30) {
      spacingIssues++
    }
  })
  
  if (spacingIssues > 0) {
    issues.value.push({
      id: 'spacing-issues',
      type: 'spacing',
      severity: 'low',
      title: 'Inconsistent Card Spacing',
      description: `${spacingIssues} cards have insufficient margins`,
      suggestion: 'Apply consistent 2.5rem margins to all cards',
      element: document.querySelector('.kg-card'),
      fix: () => {
        cards.forEach(card => {
          card.style.setProperty('margin', '2.5rem 0', 'important')
        })
      }
    })
  }
}

function fixIssue(issue) {
  if (issue.fix) {
    try {
      issue.fix()
      fixedCount.value++
      addLog(`Fixed: ${issue.title}`, 'success')
      
      // Remove from issues list
      const index = issues.value.findIndex(i => i.id === issue.id)
      if (index > -1) {
        issues.value.splice(index, 1)
      }
      
      // Re-scan after delay
      setTimeout(() => {
        addLog('Rescanning after fix...', 'info')
        runFullDiagnostics()
      }, 500)
      
    } catch (error) {
      addLog(`Failed to fix ${issue.title}: ${error.message}`, 'error')
    }
  }
}

function fixAllIssues() {
  if (issues.value.length === 0) return
  
  addLog(`Fixing ${issues.value.length} issues...`, 'info')
  
  let fixedInBatch = 0
  issues.value.forEach(issue => {
    if (issue.fix) {
      try {
        issue.fix()
        fixedInBatch++
      } catch (error) {
        addLog(`Failed to fix ${issue.title}: ${error.message}`, 'error')
      }
    }
  })
  
  fixedCount.value += fixedInBatch
  addLog(`Fixed ${fixedInBatch} issues in batch`, 'success')
  
  // Clear issues and rescan
  issues.value = []
  setTimeout(runFullDiagnostics, 1000)
}

function highlightElement(element) {
  if (!element) return
  
  // Remove existing highlights
  document.querySelectorAll('.debug-highlight').forEach(el => {
    el.classList.remove('debug-highlight')
  })
  
  // Add highlight
  element.classList.add('debug-highlight')
  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  
  // Remove after 3 seconds
  setTimeout(() => {
    element.classList.remove('debug-highlight')
  }, 3000)
  
  addLog('Element highlighted', 'info')
}

function applyCSSTest() {
  if (!customCSS.value.trim()) return
  
  document.querySelectorAll('#live-css-test').forEach(el => el.remove())
  
  const style = document.createElement('style')
  style.id = 'live-css-test'
  style.textContent = customCSS.value
  document.head.appendChild(style)
  
  addLog('Custom CSS applied', 'success')
}

function clearCSS() {
  document.querySelectorAll('#live-css-test').forEach(el => el.remove())
  customCSS.value = ''
  addLog('Custom CSS cleared', 'info')
}

function saveCSS() {
  if (!customCSS.value.trim()) return
  
  localStorage.setItem('ghost-debugger-css', customCSS.value)
  addLog('CSS saved to localStorage', 'success')
}

function applyPreset(preset) {
  customCSS.value = preset.css.trim()
  applyCSSTest()
  addLog(`Applied preset: ${preset.name}`, 'success')
}

function clearLogs() {
  logs.value = []
  addLog('Logs cleared', 'info')
}

function exportReport() {
  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    summary: {
      totalElements: getTotalElements(),
      totalIssues: issues.value.length,
      fixedCount: fixedCount.value,
      apiStatus: apiStatus.value,
      elementCounts: elementCounts.value
    },
    apiResults: apiResults.value,
    issues: issues.value.map(issue => ({
      ...issue,
      element: undefined // Don't serialize DOM elements
    })),
    logs: logs.value,
    performanceMetrics: {
      pageLoadTime: pageLoadTime.value,
      lastScanTime: lastScanTime.value
    }
  }
  
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ghost-debug-enhanced-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  addLog('Enhanced report exported', 'success')
}

// Auto-run on mount
onMounted(() => {
  pageLoadTime.value = Math.round(performance.now())
  addLog('Enhanced Ghost Debugger ready', 'success')
  
  // Load saved CSS
  const savedCSS = localStorage.getItem('ghost-debugger-css')
  if (savedCSS) {
    customCSS.value = savedCSS
    addLog('Loaded saved CSS from localStorage', 'info')
  }
  
  // Auto-run diagnostics
  setTimeout(() => {
    runFullDiagnostics()
  }, 1000)
})
</script>

<style scoped>
.ghost-debugger {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 380px;
  max-height: 90vh;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  border-radius: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  z-index: 10000;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.debugger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(0, 132, 255, 0.2), rgba(0, 200, 136, 0.2));
  border-radius: 16px 16px 0 0;
}

.debugger-header h3 {
  margin: 0;
  color: #00ff88;
  font-size: 14px;
  font-weight: 600;
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

.btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.375rem;
  border-radius: 6px;
  font-size: 12px;
  transition: all 0.2s ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.debugger-content {
  max-height: 80vh;
  overflow-y: auto;
  padding: 1.25rem;
}

.section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section h4 {
  margin: 0 0 0.75rem 0;
  color: #88ccff;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Status Grid */
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 11px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6c757d;
}

.status-success .status-dot { background: #00ff88; }
.status-warning .status-dot { background: #ffc107; }
.status-error .status-dot { background: #ff4757; }
.status-unknown .status-dot { background: #6c757d; }

/* Actions */
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.625rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  background: linear-gradient(135deg, #0084ff, #00d4aa);
  color: white;
}

.action-btn.success {
  background: linear-gradient(135deg, #00ff88, #00d4aa);
  color: black;
}

.action-btn.warning {
  background: linear-gradient(135deg, #ffc107, #ff9f00);
  color: black;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* API Results */
.api-results {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.api-test {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.api-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.api-name {
  font-weight: 600;
  color: #88ccff;
}

.api-status {
  font-size: 10px;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 600;
}

.api-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 11px;
}

.api-metric {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.error-text {
  grid-column: 1 / -1;
  color: #ff4757;
  font-size: 10px;
  margin-top: 0.5rem;
}

/* Element Grid */
.element-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.element-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.element-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.element-icon {
  font-size: 16px;
  margin-bottom: 0.25rem;
}

.element-count {
  font-size: 18px;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.25rem;
}

.element-label {
  font-size: 10px;
  color: #88ccff;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  font-weight: 600;
}

.element-issues {
  font-size: 9px;
  color: #ffc107;
}

/* Issues List */
.issues-list {
  max-height: 300px;
  overflow-y: auto;
}

.issue-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  border-left: 3px solid #ffc107;
}

.issue-item.high {
  border-left-color: #ff4757;
}

.issue-item.medium {
  border-left-color: #ffc107;
}

.issue-item.low {
  border-left-color: #88ccff;
}

.issue-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.issue-icon {
  font-size: 14px;
}

.issue-title {
  font-weight: 600;
  color: #fff;
  font-size: 12px;
  flex: 1;
}

.issue-actions {
  display: flex;
  gap: 0.25rem;
}

.fix-btn, .highlight-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
}

.fix-btn {
  background: #00ff88;
  color: black;
}

.highlight-btn {
  background: #ffc107;
  color: black;
}

.issue-description {
  font-size: 11px;
  color: #ccc;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.issue-suggestion {
  font-size: 10px;
  color: #88ccff;
  font-style: italic;
}

/* Performance Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.metric {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-label {
  display: block;
  font-size: 10px;
  color: #88ccff;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  font-weight: 600;
}

.metric-value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #00ff88;
}

/* CSS Editor */
.css-editor {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.editor-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tab-btn {
  padding: 0.5rem 0.75rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: #0084ff;
  color: white;
}

.css-textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #00ff88;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 11px;
  resize: vertical;
  line-height: 1.4;
}

.editor-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.apply-btn, .clear-btn, .save-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.apply-btn {
  background: #00ff88;
  color: black;
}

.clear-btn {
  background: #ff4757;
  color: white;
}

.save-btn {
  background: #0084ff;
  color: white;
}

.preset-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preset-btn {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-size: 11px;
  transition: all 0.2s ease;
}

.preset-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Log Section */
.log-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.clear-logs-btn {
  padding: 0.375rem 0.75rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
}

.log-level-select {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.375rem;
  font-size: 10px;
}

.log-box {
  max-height: 150px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.75rem;
}

.log-entry {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 10px;
  align-items: center;
}

.log-time {
  color: #6c757d;
  min-width: 60px;
  font-family: monospace;
}

.log-icon {
  width: 14px;
  text-align: center;
}

.log-msg {
  flex: 1;
  line-height: 1.3;
}

.log-entry.success .log-msg {
  color: #00ff88;
}

.log-entry.error .log-msg {
  color: #ff4757;
}

.log-entry.warning .log-msg {
  color: #ffc107;
}

.log-entry.info .log-msg {
  color: #88ccff;
}

/* Floating Toggle Button */
.debug-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #0084ff, #00d4aa);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 8px 25px rgba(0, 132, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
}

.debug-toggle:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 132, 255, 0.5);
}

.toggle-icon {
  font-size: 24px;
}

.toggle-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid white;
}

/* Highlight Effect */
:global(.debug-highlight) {
  outline: 3px solid #00ff88 !important;
  outline-offset: 3px !important;
  background: rgba(0, 255, 136, 0.1) !important;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3) !important;
  animation: pulse-highlight 2s ease-in-out infinite !important;
}

@keyframes pulse-highlight {
  0%, 100% { 
    outline-color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }
  50% { 
    outline-color: #0084ff;
    box-shadow: 0 0 25px rgba(0, 132, 255, 0.4);
  }
}

/* Custom Scrollbar */
.debugger-content::-webkit-scrollbar,
.issues-list::-webkit-scrollbar,
.log-box::-webkit-scrollbar {
  width: 6px;
}

.debugger-content::-webkit-scrollbar-track,
.issues-list::-webkit-scrollbar-track,
.log-box::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.debugger-content::-webkit-scrollbar-thumb,
.issues-list::-webkit-scrollbar-thumb,
.log-box::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.debugger-content::-webkit-scrollbar-thumb:hover,
.issues-list::-webkit-scrollbar-thumb:hover,
.log-box::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .ghost-debugger {
    top: 5px;
    right: 5px;
    left: 5px;
    width: auto;
    max-width: none;
  }
  
  .actions {
    grid-template-columns: 1fr;
  }
  
  .status-grid {
    grid-template-columns: 1fr;
  }
  
  .element-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .editor-actions {
    flex-direction: column;
  }
  
  .log-controls {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 480px) {
  .element-grid {
    grid-template-columns: 1fr;
  }
  
  .issue-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .issue-actions {
    margin-top: 0.5rem;
  }
}

/* Animation for new issues */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.issue-item {
  animation: slideInUp 0.3s ease-out;
}

/* Loading animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.action-btn:disabled .action-btn-text::after {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 4px;
}
</style>