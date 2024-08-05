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
      },
      durations: {
        slideDown: '300ms',
        slideUp: '300ms',
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
    ['btn', 'py-4 px-8 whitespace-nowrap bg-brand-3 text-white text-sm md:text-base font-heading uppercase rounded-full cursor-pointer inline-block focus:outline-none scale-[0.99] hover:(scale-100 no-underline) active:scale-[0.98] transition duration-150'],
    ['btn-primary', 'bg-brand-1 text-brand-4'],
    ['btn-secondary', 'bg-white text-brand-3'],
    ['btn-outline', 'bg-transparent text-brand-dark border border-brand-dark'],
    ['btn-link', 'text-brand-dark underline'],
    ['btn-slim', 'py-2 px-4 text-sm font-normal'],
    ['grid-margins', 'max-w-screen-xl mx-auto px-6'],
    ['grid-margins-max', 'm-a max-w-screen-2xl'],
    ['heading', 'font-heading'],
    ['h1', 'heading text-4xl md:text-5xl lg:text-6xl font-normal'],
    ['h2', 'heading text-3xl md:text-4xl lg:text-5xl font-normal'],
    ['h3', 'heading text-2xl md:text-3xl font-normal'],
    ['h4', 'heading text-xl md:text-2xl font-normal'],
    ['h5', 'heading text-lg font-normal'],
    ['h6', 'heading text-base font-normal'],
    ['p1', 'text-base sm:text-xl font-sans font-normal'],
    ['p2', 'text-base sm:text-xl font-sans font-normal'],
    ['p3', 'text-base font-sans font-normal'],
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        sans: ['DM Sans:300,400,500', { name: 'DM Sans fallback', provider: 'none' }],
        heading: ['Epilogue:300,400,500', { name: 'Poppins fallback', provider: 'none' }],
        serif: ['Erode'],
        mono: ['DM Mono:400', { name: 'DM Mono fallback', provider: 'none' }],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
