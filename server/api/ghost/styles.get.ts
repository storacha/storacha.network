// server/api/ghost/styles.get.ts - Updated with better fallback CSS
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const ghostUrl = config.public.ghostUrl
  
  // Set proper headers
  setHeader(event, 'content-type', 'text/css; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')
  
  if (!ghostUrl) {
    setResponseStatus(event, 503)
    return getComprehensiveGhostCSS()
  }

  try {
    // Try to get Ghost's actual CSS first
    const cleanUrl = ghostUrl.replace(/\/$/, '')
    
    // Try multiple CSS endpoints that Ghost might use
    const possibleCSSUrls = [
      `${cleanUrl}/assets/built/screen.css`,
      `${cleanUrl}/assets/built/ghost.css`,
      `${cleanUrl}/assets/built/casper.css`,
      `${cleanUrl}/public/ghost.css`
    ]
    
    let ghostCSS = null
    
    for (const cssUrl of possibleCSSUrls) {
      try {
        const response = await $fetch(cssUrl, {
          headers: {
            'User-Agent': 'Storacha-Bot/1.0',
            'Accept': 'text/css,*/*'
          },
          timeout: 5000
        })

        if (response && typeof response === 'string' && response.length > 500) {
          ghostCSS = response
          console.log(`✅ Ghost CSS loaded from: ${cssUrl}`)
          break
        }
      } catch (err) {
        // Continue to next URL
        continue
      }
    }

    if (ghostCSS) {
      const processedCSS = processGhostCSS(ghostCSS)
      setHeader(event, 'x-ghost-source', 'live')
      setHeader(event, 'x-ghost-url', cleanUrl)
      return processedCSS
    } else {
      console.warn('⚠️ No Ghost CSS found, using comprehensive fallback')
      setHeader(event, 'x-ghost-source', 'fallback')
      return getComprehensiveGhostCSS()
    }
    
  } catch (error) {
    console.warn('❌ Ghost CSS fetch failed:', error)
    setHeader(event, 'x-ghost-source', 'fallback-error')
    return getComprehensiveGhostCSS()
  }
})

function processGhostCSS(css: string): string {
  // Clean and scope the CSS to prevent conflicts
  let processed = css
    // Remove problematic @import statements
    .replace(/@import[^;]+;/g, '')
    // Remove font-face declarations that might conflict
    .replace(/@font-face\s*{[^}]*}/gs, '')
    // Scope body and html selectors
    .replace(/\bbody\b(?=\s*[{,])/g, '.ghost-content')
    .replace(/\bhtml\b(?=\s*[{,])/g, '.ghost-content')
    // Scope common conflict-prone selectors
    .replace(/\b(h[1-6]|p|a|ul|ol|li|blockquote|img|figure)\b(?=\s*[{,])/g, '.ghost-content $1')

  return `
/* Ghost CMS Styles - Live from ${new Date().toISOString()} */

/* Reset and isolation */
.ghost-content-isolation {
  all: initial;
  isolation: isolate;
  contain: layout style;
  display: block;
  width: 100%;
  max-width: none;
}

.ghost-content-isolation * {
  box-sizing: border-box;
}

/* Base ghost content container */
.ghost-content {
  all: initial;
  display: block;
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  line-height: 1.6;
  color: #15171a;
  max-width: none;
  margin: 0;
  padding: 0;
}

${processed}

/* Ensure Ghost cards work properly */
.ghost-content .kg-card {
  margin: 2em 0;
}

.ghost-content .kg-image {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
  margin: 2em auto;
}

.ghost-content .kg-bookmark-card {
  border: 1px solid #e5eff5;
  border-radius: 6px;
  display: flex;
  margin: 2em 0;
  overflow: hidden;
  text-decoration: none;
  background: #fff;
  transition: box-shadow 0.15s ease;
}

.ghost-content .kg-bookmark-card:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  text-decoration: none;
}

.ghost-content .kg-btn {
  background: #0084ff;
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ghost-content .kg-btn:hover {
  background: #005aa3;
  color: #fff;
  text-decoration: none;
  transform: translateY(-1px);
}
`
}

function getComprehensiveGhostCSS(): string {
  return `
/* Comprehensive Ghost CMS Styles - Fallback */

/* Isolation and reset */
.ghost-content-isolation {
  all: initial;
  isolation: isolate;
  contain: layout style;
  display: block;
  width: 100%;
  max-width: none;
  
  /* Block framework variables */
  --tw-ring-shadow: initial;
  --tw-shadow: initial;
  --tw-space-x-reverse: initial;
  --tw-space-y-reverse: initial;
  --uno-ring-shadow: initial;
  --uno-shadow: initial;
}

.ghost-content-isolation *,
.ghost-content-isolation *::before,
.ghost-content-isolation *::after {
  box-sizing: border-box;
  --tw-ring-shadow: initial;
  --tw-shadow: initial;
  --tw-space-x-reverse: initial;
  --tw-space-y-reverse: initial;
  --uno-ring-shadow: initial;
  --uno-shadow: initial;
}

/* Base content container */
.ghost-content {
  all: initial;
  display: block;
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  line-height: 1.6;
  color: #15171a;
  max-width: none;
  margin: 0;
  padding: 0;
}

.ghost-content > * + * {
  margin-top: 1.5em;
}

.ghost-content > *:first-child {
  margin-top: 0;
}

/* Typography */
.ghost-content h1,
.ghost-content h2,
.ghost-content h3,
.ghost-content h4,
.ghost-content h5,
.ghost-content h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 700;
  line-height: 1.25;
  margin: 1.5em 0 0.5em 0;
  color: #15171a;
  display: block;
}

.ghost-content h1 { font-size: 3.2rem; margin-top: 0; }
.ghost-content h2 { font-size: 2.6rem; }
.ghost-content h3 { font-size: 2.0rem; }
.ghost-content h4 { font-size: 1.8rem; }
.ghost-content h5 { font-size: 1.6rem; }
.ghost-content h6 { font-size: 1.4rem; }

.ghost-content p {
  margin: 0 0 1.5em 0;
  line-height: 1.6;
  font-size: 20px;
  color: #15171a;
  display: block;
}

.ghost-content a {
  color: #0084ff;
  text-decoration: underline;
  text-decoration-color: rgba(0, 132, 255, 0.3);
  text-underline-offset: 2px;
  transition: all 0.2s ease;
}

.ghost-content a:hover {
  text-decoration-color: #0084ff;
}

.ghost-content ul,
.ghost-content ol {
  margin: 0 0 1.5em 0;
  padding-left: 2em;
  display: block;
}

.ghost-content ul { list-style-type: disc; }
.ghost-content ol { list-style-type: decimal; }

.ghost-content li {
  margin-bottom: 0.5em;
  line-height: 1.6;
  display: list-item;
}

.ghost-content blockquote {
  margin: 2em 0;
  padding: 0 0 0 1.5em;
  border-left: 4px solid #e5eff5;
  font-style: italic;
  color: #626d79;
  display: block;
}

.ghost-content code {
  background: #f1f1f1;
  border-radius: 3px;
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: 0.85em;
  padding: 0.15em 0.4em;
  color: #eb5757;
}

.ghost-content pre {
  background: #15171a;
  color: #fff;
  border-radius: 6px;
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 2em 0;
  overflow-x: auto;
  padding: 1.5em;
  display: block;
}

.ghost-content pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.ghost-content hr {
  border: none;
  border-top: 1px solid #e5eff5;
  margin: 3em 0;
  height: 1px;
  display: block;
}

/* Images */
.ghost-content img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 2em auto;
  border-radius: 6px;
}

.ghost-content figure {
  margin: 2em 0;
  display: block;
}

/* Ghost Cards */
.ghost-content .kg-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 2em auto;
  border-radius: 6px;
}

.ghost-content .kg-gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5em;
  margin: 2em 0;
}

.ghost-content .kg-gallery-image {
  overflow: hidden;
  border-radius: 3px;
}

.ghost-content .kg-gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  border-radius: 0;
}

.ghost-content .kg-bookmark-card {
  border: 1px solid #e5eff5;
  border-radius: 6px;
  display: flex;
  margin: 2em 0;
  overflow: hidden;
  text-decoration: none;
  background: #fff;
  transition: box-shadow 0.15s ease;
}

.ghost-content .kg-bookmark-card:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  text-decoration: none;
}

.ghost-content .kg-bookmark-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  min-width: 0;
}

.ghost-content .kg-bookmark-title {
  color: #15171a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ghost-content .kg-bookmark-description {
  color: #626d79;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ghost-content .kg-bookmark-metadata {
  color: #626d79;
  font-size: 14px;
  line-height: 1.5;
  margin-top: auto;
}

.ghost-content .kg-bookmark-thumbnail {
  flex-shrink: 0;
  width: 160px;
  height: 120px;
  overflow: hidden;
}

.ghost-content .kg-bookmark-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  border-radius: 0;
}

/* Button Cards */
.ghost-content .kg-btn,
.ghost-content .not-kg-prose {
  background: #0084ff;
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.ghost-content .kg-btn:hover,
.ghost-content .not-kg-prose:hover {
  background: #005aa3;
  color: #fff;
  text-decoration: none;
  transform: translateY(-1px);
}

.ghost-content a.not-kg-prose span,
.ghost-content button.not-kg-prose span {
  display: block;
  padding: 0;
  font-size: 16px;
  line-height: 1.4;
}

/* Callout Cards */
.ghost-content .kg-callout-card {
  background: #f8fbfe;
  border-left: 4px solid #0084ff;
  border-radius: 0 6px 6px 0;
  margin: 2em 0;
  padding: 1.5em;
}

.ghost-content .kg-callout-emoji {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  display: block;
  line-height: 1;
}

.ghost-content .kg-callout-text {
  font-size: 16px;
  line-height: 1.6;
  color: #15171a;
  margin: 0;
}

/* Header Cards */
.ghost-content .kg-header-card {
  background: #000;
  color: #fff;
  margin: 2em 0;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
}

.ghost-content .kg-header-card h1,
.ghost-content .kg-header-card h2,
.ghost-content .kg-header-card h3 {
  color: #fff;
  margin: 0 0 1rem 0;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
}

.ghost-content .kg-header-card p {
  color: #fff;
  opacity: 0.8;
  font-size: 1.25rem;
  margin: 0;
  line-height: 1.5;
}

/* Embed Cards */
.ghost-content iframe {
  width: 100%;
  border: none;
  border-radius: 6px;
  margin: 2em 0;
  display: block;
  min-height: 400px;
}

.ghost-content iframe[src*="youtube"],
.ghost-content iframe[src*="youtu.be"] {
  aspect-ratio: 16 / 9;
  height: auto;
}

.ghost-content iframe[src*="twitter"],
.ghost-content iframe[src*="x.com"] {
  max-width: 550px;
  margin: 2em auto;
}

/* Video Cards */
.ghost-content .kg-video-card {
  margin: 2em 0;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.ghost-content .kg-video-card video {
  width: 100%;
  height: auto;
  display: block;
}

/* File Cards */
.ghost-content .kg-file-card {
  border: 1px solid #e5eff5;
  border-radius: 6px;
  display: flex;
  margin: 2em 0;
  padding: 0.5rem;
  background: #fff;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s ease;
}

.ghost-content .kg-file-card:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  text-decoration: none;
}

.ghost-content .kg-file-card-contents {
  flex-grow: 1;
  padding: 0 1rem;
}

.ghost-content .kg-file-card-title {
  color: #15171a;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.ghost-content .kg-file-card-metadata {
  color: #626d79;
  font-size: 14px;
}

.ghost-content .kg-file-card-icon {
  width: 64px;
  height: 64px;
  background: #f1f1f1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Width variations */
.ghost-content .kg-width-wide {
  margin-left: calc(-8vw);
  margin-right: calc(-8vw);
  max-width: none;
}

.ghost-content .kg-width-full {
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  max-width: none;
  width: 100vw;
}

/* Responsive */
@media (max-width: 768px) {
  .ghost-content {
    font-size: 18px;
  }
  
  .ghost-content h1 { font-size: 2.4rem; }
  .ghost-content h2 { font-size: 2.0rem; }
  .ghost-content h3 { font-size: 1.6rem; }
  .ghost-content h4 { font-size: 1.4rem; }
  .ghost-content h5 { font-size: 1.2rem; }
  .ghost-content h6 { font-size: 1.1rem; }
  
  .ghost-content .kg-bookmark-card {
    flex-direction: column;
  }
  
  .ghost-content .kg-bookmark-thumbnail {
    width: 100%;
    height: 200px;
  }
  
  .ghost-content .kg-width-wide,
  .ghost-content .kg-width-full {
    margin-left: -1rem;
    margin-right: -1rem;
    width: calc(100% + 2rem);
  }
  
  .ghost-content .kg-header-card {
    padding: 2rem 1rem;
  }
  
  .ghost-content .kg-header-card h1,
  .ghost-content .kg-header-card h2,
  .ghost-content .kg-header-card h3 {
    font-size: 2rem;
  }
  
  .ghost-content .kg-header-card p {
    font-size: 1rem;
  }
  
  .ghost-content .kg-gallery-container {
    grid-template-columns: 1fr;
  }
}

/* ✅ Specific styles for your Ghost theme classes based on the HTML */

/* Button styling matching your accent color */
.ghost-content [style*="bg-accent"] {
  background: #FF1A75 !important;
  color: #fff !important;
}

.ghost-content [style*="bg-accent"]:hover {
  background: #CD0051 !important;
  color: #fff !important;
}

/* Text styling for descriptions */
.ghost-content .text-grey-800,
.ghost-content .text-grey-900 {
  color: #626d79 !important;
}

.ghost-content .text-grey-100,
.ghost-content .text-grey-200 {
  color: #15171a !important;
}

/* Border colors */
.ghost-content .border-grey\\/40,
.ghost-content .border-grey\\/20 {
  border-color: #e5eff5 !important;
}

/* Flex layouts */
.ghost-content .flex {
  display: flex !important;
}

.ghost-content .flex-col {
  flex-direction: column !important;
}

.ghost-content .items-center {
  align-items: center !important;
}

.ghost-content .justify-center {
  justify-content: center !important;
}

.ghost-content .gap-6 {
  gap: 1.5rem !important;
}

/* Padding and margin classes */
.ghost-content .p-5 {
  padding: 1.25rem !important;
}

.ghost-content .py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.ghost-content .px-5 {
  padding-left: 1.25rem !important;
  padding-right: 1.25rem !important;
}

.ghost-content .mt-1 {
  margin-top: 0.25rem !important;
}

.ghost-content .mb-2 {
  margin-bottom: 0.5rem !important;
}

/* Text sizes */
.ghost-content .text-sm {
  font-size: 14px !important;
}

.ghost-content .text-lg {
  font-size: 18px !important;
}

.ghost-content .text-xl {
  font-size: 20px !important;
}

.ghost-content .text-2xl {
  font-size: 24px !important;
}

/* Font weights */
.ghost-content .font-semibold {
  font-weight: 600 !important;
}

.ghost-content .font-medium {
  font-weight: 500 !important;
}

.ghost-content .font-bold {
  font-weight: 700 !important;
}

/* Line height and text handling */
.ghost-content .leading-normal {
  line-height: 1.5 !important;
}

.ghost-content .line-clamp-2 {
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}

.ghost-content .truncate {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

/* Border radius */
.ghost-content .rounded-md {
  border-radius: 6px !important;
}

.ghost-content .rounded-lg {
  border-radius: 8px !important;
}

.ghost-content .rounded-r-\\[\\.5rem\\] {
  border-top-right-radius: 0.5rem !important;
  border-bottom-right-radius: 0.5rem !important;
}
`
}