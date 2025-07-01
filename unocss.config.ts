// unocss.config.ts - Fixed to work with Ghost CSS
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        slideDown: '{from{height:0}to{height:var(--radix-accordion-content-height)}}',
        slideUp: '{from{height:var(--radix-accordion-content-height)}to{height:0}}',
        overlayShow: '{from{opacity:0}to{opacity:1}}',
        contentShow: `{from{opacity:0;transform:'translate(-50%,-48%) scale(0.96)'}to{opacity:1;transform:'translate(-50%,-50%) scale(1)';}}`,
      },
      durations: {
        slideDown: '300ms',
        slideUp: '300ms',
        overlayShow: '150ms',
        contentShow: '150ms',
      },
      timingFns: {
        slideDown: 'cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
    colors: {
      brand: {
        dark: '#000',
        light: '#fff',
        1: '#0176CE',
        2: '#BDE0FF',
        3: '#E91315',
        4: '#EFE3F3',
        5: '#FFC83F',
        6: '#FFE4AE',
      },
    },
  },
  shortcuts: [
    ['btn', 'py-4 px-8 whitespace-nowrap bg-brand-3 text-white text-sm md:text-base font-heading uppercase rounded-full cursor-pointer inline-flex items-center justify-center focus:outline-none scale-[0.99] hover:(scale-100 no-underline) active:scale-[0.98] transition duration-150'],
    ['btn-primary', 'bg-brand-1 text-brand-4'],
    ['btn-secondary', 'bg-white text-brand-3'],
    ['btn-outline', 'bg-transparent text-color-current b-1 b-color-current'],
    ['btn-link', 'text-brand-dark underline'],
    ['btn-slim', 'py-2 px-4 text-sm font-normal'],
    ['grid-margins', 'max-w-screen-xl mx-auto px-6'],
    ['grid-margins-max', 'm-a max-w-screen-2xl'],
    ['heading', 'font-heading'],
    ['section-py', 'py-15'],
    ['h1', 'heading text-4xl md:text-5xl lg:text-6xl font-normal'],
    ['h2', 'heading text-3xl md:text-4xl lg:text-5xl font-normal'],
    ['h3', 'heading text-2xl md:text-3xl font-normal'],
    ['h4', 'heading text-xl md:text-2xl font-normal'],
    ['h5', 'heading text-lg font-normal'],
    ['h6', 'heading text-base font-normal'],
    ['p1', 'text-base font-sans font-normal md:text-lg'],
    ['p2', 'text-base font-sans font-normal md:text-lg'],
    ['p3', 'text-base font-sans font-normal'],
    ['p4', 'text-sm font-sans font-normal'],
  ],
  
  // ✅ GHOST SAFELIST - Comprehensive protection for all Ghost classes
  safelist: [
    // Ghost isolation wrapper
    'ghost-content-isolation',
    'ghost-content',
    'ghost-content-root',
    
    // Ghost layout classes
    'ghost-page',
    'ghost-layout', 
    'ghost-main',
    'ghost-header',
    'ghost-footer',
    'ghost-article',
    'ghost-container',
    'ghost-nav',
    'ghost-breadcrumb',
    'ghost-loading',
    'ghost-error',
    
    // Ghost post elements
    'ghost-post-header',
    'ghost-post-title', 
    'ghost-post-meta',
    'ghost-author',
    'ghost-author-image',
    'ghost-author-avatar',
    'ghost-author-name',
    'ghost-meta-dot',
    'ghost-tags',
    'ghost-tag',
    'ghost-excerpt',
    'ghost-feature-image',
    
    // ALL Ghost kg- card classes (this is critical)
    'kg-card',
    'kg-image',
    'kg-image-card',
    'kg-gallery-card',
    'kg-gallery-container',
    'kg-gallery-row',
    'kg-gallery-image',
    'kg-bookmark-card',
    'kg-bookmark-container', 
    'kg-bookmark-content',
    'kg-bookmark-title',
    'kg-bookmark-description',
    'kg-bookmark-metadata',
    'kg-bookmark-thumbnail',
    'kg-bookmark-icon',
    'kg-bookmark-author',
    'kg-bookmark-publisher',
    'kg-button-card',
    'kg-btn',
    'kg-btn-accent',
    'kg-callout-card',
    'kg-callout-emoji',
    'kg-callout-text',
    'kg-width-wide',
    'kg-width-full',
    'kg-width-regular',
    'kg-embed-card',
    'kg-code-card',
    'kg-html-card',
    'kg-markdown-card',
    'kg-signup-card',
    'kg-audio-card',
    'kg-video-card',
    'kg-video-container',
    'kg-file-card',
    'kg-file-card-container',
    'kg-file-card-contents',
    'kg-file-card-title',
    'kg-file-card-caption',
    'kg-file-card-metadata',
    'kg-file-card-filename',
    'kg-file-card-filesize',
    'kg-file-card-icon',
    'kg-product-card',
    'kg-toggle-card',
    'kg-header-card',
    'kg-header-card-content',
    'kg-header-card-text',
    'kg-header-card-heading',
    'kg-header-card-subheading',
    'kg-nft-card',
    'kg-cta-card',
    'kg-cta-content',
    'kg-cta-content-inner',
    'kg-cta-text',
    'kg-cta-button',
    'kg-align-center',
    'kg-align-left',
    'kg-align-right',
    'kg-v2',
    'kg-content-wide',
  ],
  
  // ✅ BLOCK PROSE UTILITIES to prevent conflicts
  blocklist: [
    'prose',
    'prose-sm',
    'prose-base', 
    'prose-lg',
    'prose-xl',
    'prose-2xl',
    'not-prose',
    'prose-gray',
    'prose-slate',
    'prose-zinc',
    'prose-neutral',
    'prose-stone',
    'prose-red',
    'prose-orange',
    'prose-amber',
    'prose-yellow',
    'prose-lime',
    'prose-green',
    'prose-emerald',
    'prose-teal',
    'prose-cyan',
    'prose-sky',
    'prose-blue',
    'prose-indigo',
    'prose-violet',
    'prose-purple',
    'prose-fuchsia',
    'prose-pink',
    'prose-rose',
    'max-w-prose',
  ],
  
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      collections: {
        mdi: () => import('@iconify/json/json/mdi.json').then(i => i.default),
      }
    }),
    // ✅ Configure Typography to completely avoid Ghost content
    presetTypography({
      // Don't apply prose styles to Ghost content at all
      cssExtend: {
        // Ensure Ghost content is completely isolated from prose
        '.prose .ghost-content-isolation': {
          'all': 'revert !important',
        },
        '.prose .ghost-content-isolation *': {
          'all': 'revert !important',
        },
        '.prose .ghost-content': {
          'all': 'revert !important',
        },
        '.prose .ghost-content *': {
          'all': 'revert !important',
        },
        // Block prose from affecting any kg- classes
        '.prose [class*="kg-"]': {
          'all': 'revert !important',
        },
        // Ensure prose doesn't override Ghost isolation
        '.ghost-content-isolation': {
          'font-family': 'revert !important',
          'font-size': 'revert !important',
          'line-height': 'revert !important',
          'color': 'revert !important',
          'margin': 'revert !important',
          'padding': 'revert !important',
        }
      }
    }),
    presetWebFonts({
      fonts: {
        heading: [
          { name: 'Epilogue', weights: ['400', '500', '600'], provider: 'bunny' },
          { name: 'Epilogue fallback', provider: 'none' },
        ],
        sans: [
          { name: 'DM Sans', weights: ['400', '500'], provider: 'bunny' },
          { name: 'DM Sans fallback', provider: 'none' },
        ],
        mono: [
          { name: 'DM Mono', provider: 'bunny' },
          { name: 'DM Mono fallback', provider: 'none' },
        ],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})