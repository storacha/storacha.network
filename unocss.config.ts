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
    // Updated button with inline-flex for better text centering
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
  
  // CRITICAL: Safelist Ghost classes to prevent UnoCSS from processing them
  safelist: [
    // Ghost page wrapper classes
    'ghost-page-wrapper',
    'ghost-container',
    'ghost-article',
    'ghost-header',
    'ghost-content-wrapper',
    'ghost-footer-wrapper',
    
    // Ghost content isolation - MOST IMPORTANT
    'ghost-content-isolation',
    'ghost-content',
    
    // Ghost card classes - all kg-* variations
    'kg-image',
    'kg-gallery-container',
    'kg-gallery-image',
    'kg-bookmark-card',
    'kg-bookmark-content',
    'kg-bookmark-title',
    'kg-bookmark-description',
    'kg-bookmark-metadata',
    'kg-bookmark-thumbnail',
    'kg-callout-card',
    'kg-callout-emoji',
    'kg-callout-text',
    'kg-button-card',
    'kg-btn',
    'kg-btn-accent',
    'kg-width-wide',
    'kg-width-full',
    'kg-embed-card',
    'kg-code-card',
    'kg-card',
    'kg-image-card',
    'kg-gallery-card',
    'kg-bookmark-card',
    'kg-callout-card',
    'kg-button-card',
    'kg-embed-card',
    'kg-code-card',
    'kg-html-card',
    'kg-markdown-card',
    'kg-signup-card',
    'kg-audio-card',
    'kg-video-card',
    'kg-file-card',
    'kg-product-card',
    'kg-toggle-card',
    'kg-header-card',
    'kg-nft-card',
    
    // Ghost layout classes
    'ghost-loading',
    'ghost-error',
    'ghost-breadcrumb',
    'ghost-feature-image',
    'ghost-post-header',
    'ghost-post-title',
    'ghost-post-meta',
    'ghost-author',
    'ghost-tags',
    'ghost-tag',
    'ghost-excerpt',
  ],
  
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      collections: {
        mdi: () => import('@iconify/json/json/mdi.json').then(i => i.default),
      }
    }),
    // Configure presetTypography to completely exclude Ghost content
    presetTypography({
      // Disable prose styles within Ghost content
      cssExtend: {
        // Ensure UnoCSS prose doesn't affect Ghost content
        '.ghost-content-isolation': {
          'all': 'revert !important',
        },
        '.ghost-content-isolation *': {
          'all': 'revert !important',
        },
        '.ghost-content': {
          'max-width': 'none !important',
          'font-family': 'Georgia, Times, "Times New Roman", serif !important',
        },
        // Prevent prose from affecting any Ghost classes
        '.prose .ghost-content': {
          'all': 'revert !important',
        },
        '.prose .ghost-content *': {
          'all': 'revert !important',
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
  
  // CRITICAL: Block UnoCSS from processing Ghost-specific patterns
  blocklist: [
    // Prevent UnoCSS from generating conflicting prose styles
    'prose-sm',
    'prose-base',
    'prose-lg',
    'prose-xl',
    'prose-2xl',
    // Block specific utility patterns that might interfere
    'not-prose',
  ],
  
  // Exclude Ghost content from being processed
  content: {
    pipeline: {
      exclude: [
        // Don't process any content within ghost-content-isolation
        /ghost-content-isolation/,
        /ghost-content/,
      ]
    }
  }
})