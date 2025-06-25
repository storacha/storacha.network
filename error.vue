<script setup lang="ts">
// This goes in your root directory as ~/error.vue (NOT in layouts/ or pages/)

interface Props {
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
    url?: string
    data?: any
  }
}

const props = defineProps<Props>()

// Check if we're in development and on client side
const isDev = process.dev
const isClientSide = process.client

// Comprehensive HTTP status code handling
const errorData = computed(() => {
  const statusCode = props.error.statusCode || 500
  const statusCodeStr = statusCode.toString()

  // 4xx Client Errors
  if (statusCode === 400) {
    return {
      title: 'Bad Request',
      subtitle: 'That request didn\'t look quite right to our RACHA!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: false
    }
  }
  
  if (statusCode === 401) {
    return {
      title: 'Unauthorized',
      subtitle: 'You need to be logged in to access this page!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: false
    }
  }
  
  if (statusCode === 403) {
    return {
      title: 'Forbidden',
      subtitle: 'This area is off-limits, even for our RACHA!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: false
    }
  }
  
  if (statusCode === 404) {
    return {
      title: 'Page Not Found',
      subtitle: 'Oops! This page seems to have vanished into the decentralized void.',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: false
    }
  }
  
  if (statusCode === 408) {
    return {
      title: 'Request Timeout',
      subtitle: 'That took longer than our RACHA had patience for!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: true
    }
  }
  
  if (statusCode === 410) {
    return {
      title: 'Gone',
      subtitle: 'This page has been permanently removed!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: false
    }
  }
  
  if (statusCode === 413) {
    return {
      title: 'Payload Too Large',
      subtitle: 'Whoa! That\'s too much data for our website to handle!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: false
    }
  }
  
  if (statusCode === 422) {
    return {
      title: 'Unprocessable Entity',
      subtitle: 'Our RACHA couldn\'t understand that request!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: false
    }
  }
  
  if (statusCode === 429) {
    return {
      title: 'Too Many Requests',
      subtitle: 'Slow down! Our RACHA needs a breather!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '4xx',
      showRetry: true
    }
  }
  
  // 5xx Server Errors
  if (statusCode === 500) {
    return {
      title: 'Internal Server Error',
      subtitle: 'Our website encountered an unexpected problem!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: true
    }
  }
  
  if (statusCode === 501) {
    return {
      title: 'Not Implemented',
      subtitle: 'This feature isn\'t ready yet!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: false
    }
  }
  
  if (statusCode === 502) {
    return {
      title: 'Bad Gateway',
      subtitle: 'There\'s an issue with our web server!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: true
    }
  }
  
  if (statusCode === 503) {
    return {
      title: 'Service Unavailable',
      subtitle: 'Our website is temporarily down for maintenance!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: true
    }
  }
  
  if (statusCode === 504) {
    return {
      title: 'Gateway Timeout',
      subtitle: 'Our web server took too long to respond!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: true
    }
  }
  
  if (statusCode === 505) {
    return {
      title: 'HTTP Version Not Supported',
      subtitle: 'Your browser is using an outdated protocol!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: false
    }
  }
  
  if (statusCode === 507) {
    return {
      title: 'Insufficient Storage',
      subtitle: 'Our web server is running out of space!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: false
    }
  }
  
  if (statusCode === 508) {
    return {
      title: 'Loop Detected',
      subtitle: 'Our RACHA got stuck in an infinite loop!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: false
    }
  }
  
  if (statusCode === 511) {
    return {
      title: 'Network Authentication Required',
      subtitle: 'Network access requires authentication!',
      image: '/img/errors/error-confused-racha.svg',
      statusCode: statusCodeStr,
      category: '5xx',
      showRetry: false
    }
  }
  
  // Default fallback for any other status codes
  return {
    title: statusCode >= 500 ? 'Server Error' : statusCode >= 400 ? 'Client Error' : 'Something Went Wrong',
    subtitle: statusCode >= 500 
      ? 'Our website is having technical difficulties!' 
      : statusCode >= 400 
      ? 'That request confused our RACHA!'
      : 'An unexpected error occurred.',
    image: '/img/errors/error-confused-racha.svg',
    statusCode: statusCodeStr,
    category: statusCode >= 500 ? '5xx' : statusCode >= 400 ? '4xx' : 'unknown',
    showRetry: statusCode >= 500
  }
})

// SEO metadata - following best practices for all error codes
useSeoMeta({
  title: `${errorData.value.statusCode} - ${errorData.value.title} | Storacha`,
  description: errorData.value.subtitle,
  robots: 'noindex, follow', // Best practice: don't index errors but allow link following
})

// Structured data for error pages
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `${errorData.value.statusCode} Error`,
      "description": errorData.value.subtitle,
      "url": `https://storacha.network${props.error.url || ''}`,
      "potentialAction": {
        "@type": "Action",
        "name": "Go to Homepage",
        "target": "https://storacha.network"
      }
    })
  }]
})

// Handle navigation with proper error recovery
function handleGoHome() {
  return clearError({ redirect: '/' })
}

function handleGoBack() {
  if (isClientSide && window.history.length > 1) {
    window.history.back()
  } else {
    return clearError({ redirect: '/' })
  }
}

function handleRetry() {
  return clearError({ redirect: props.error.url || '/' })
}

// Automatic retry for certain server errors (after delay)
let retryTimeout: NodeJS.Timeout | null = null

onMounted(() => {
  // Auto-retry for temporary server errors after 5 seconds
  if (errorData.value.category === '5xx' && [502, 503, 504].includes(props.error.statusCode || 0)) {
    retryTimeout = setTimeout(() => {
      if (isClientSide) {
        handleRetry()
      }
    }, 5000)
  }
})

onUnmounted(() => {
  if (retryTimeout) {
    clearTimeout(retryTimeout)
  }
})
</script>

<template>
  <!-- Apply your default layout using NuxtLayout -->
  <NuxtLayout>
    <!-- Main error content with proper spacing to avoid header overlap -->
    <div class="min-h-screen bg-brand-4 pt-24 pb-10">
      <Section class="flex items-center justify-center min-h-[calc(100vh-6rem)]" padding>
        <div class="max-w-5xl mx-auto">
          <!-- Error content with side-by-side layout on large screens -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            <!-- Left side: Error code and text -->
            <div class="order-2 lg:order-1 text-center lg:text-left">
              <!-- Large error code -->
              <div class="text-6xl md:text-8xl lg:text-9xl font-heading font-medium color-brand-3 opacity-20 leading-none mb-6">
                {{ errorData.statusCode }}
              </div>
              
              <!-- Personal message with better sizing -->
              <div class="h3 color-brand-3 font-medium mb-8">
                {{ errorData.subtitle }} 🔥
              </div>
              
              <!-- Auto-retry indicator for server errors -->
              <div v-if="errorData.category === '5xx' && [502, 503, 504].includes(props.error.statusCode || 0)" 
                   class="p4 color-brand-3 opacity-70 mb-8">
                <span class="animate-pulse">🔄 Automatically retrying in a few seconds...</span>
              </div>

              <!-- Action Buttons using your exact button styling -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Btn 
                  @click="handleGoHome"
                  text="🏠 Go to Homepage"
                  class="btn bg-brand-3 text-white"
                />
                
                <Btn 
                  @click="handleGoBack"
                  text="⬅️ Go Back" 
                  class="btn btn-secondary"
                />
                
                <Btn 
                  v-if="errorData.showRetry"
                  @click="handleRetry"
                  text="🔄 Try Again"
                  class="btn btn-outline"
                />
              </div>

              <!-- Optional technical details for developers (collapsed by default) -->
              <div v-if="isDev" class="mt-8 text-left">
                <details class="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <summary class="cursor-pointer p4 font-medium mb-2">Debug Info (Dev Only)</summary>
                  <div class="text-xs space-y-2 p4">
                    <p><strong>Status Code:</strong> {{ errorData.statusCode }}</p>
                    <p><strong>URL:</strong> {{ props.error.url || 'Unknown' }}</p>
                    <p><strong>Timestamp:</strong> {{ new Date().toISOString() }}</p>
                    <details class="mt-2">
                      <summary class="cursor-pointer text-xs">Full Error Object</summary>
                      <pre class="text-xs whitespace-pre-wrap overflow-auto mt-2 bg-black/20 p-2 rounded">{{ JSON.stringify(props.error, null, 2) }}</pre>
                    </details>
                  </div>
                </details>
              </div>
            </div>

            <!-- Right side: RACHA image (smaller size) -->
            <div class="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img 
                :src="errorData.image" 
                :alt="errorData.title"
                class="w-full max-w-xs lg:max-w-sm h-auto"
                loading="eager"
              >
            </div>
          </div>

          <!-- Contact Support for server errors -->
          <div v-if="errorData.category === '5xx'" class="mt-16 text-center">
            <div class="max-w-xl mx-auto p-8 bg-white/10 rounded-lg backdrop-blur-sm">
              <div class="flex items-center justify-center mb-4">
                <div class="text-4xl mr-4">🆘</div>
                <div class="h5 color-brand-3">Need Help?</div>
              </div>
              <div class="p3 color-brand-3">
                If this problem persists, our support team is here to help! Reach out at 
                <AppLink 
                  href="mailto:support@storacha.network" 
                  class="color-brand-3 hover:underline font-medium"
                >
                  support@storacha.network
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  </NuxtLayout>
</template>