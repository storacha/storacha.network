// @unocss-include

// global app config
export default defineAppConfig({
  dateFormat: 'MMM DD, YYYY',
  actions: {
    start: { text: 'Start Storing', href: 'https://console.storacha.network/' },
    headerLinks: [
      { text: 'Roadmap', href: '/roadmap' },
      { text: 'Ecosystem', href: '/ecosystem' },
      { text: 'Node Providers', href: '/node-providers' },
      { text: 'Blog', href: '/blog' },
    ],
    mailingList: {
      icon: 'i-carbon:email',
      href: 'https://945c6cfe.sibforms.com/serve/MUIFAJsqje9uA4owcVGYYaQWZarreW_oOzT9j0aXOY1QcOdsXQ7ZjvWvrpXKqNm9sBilY3Pum8s9CyPAkA2ELLEyJp3DVvzEDFg-Ov967IegSH6PXRAG6ulFhavIwebzTu3XsMZbpnyWbsDp5hexye1aXcFs4C9oIFFJWX2Aar8ElyUJDCPSsoeMAdj6puyREL1zUrjNpq2ZobYx',
      text: 'Join mailing list',
    },
    email: { text: 'Contact Us', href: 'mailto:hello@storacha.network' },
    footerLinks: {
      resources: [
        { text: 'Quickstart Guide', href: '' },
        { text: 'FAQ', href: '' },
        { text: 'Contact Us', href: '' },
        { text: 'Terms of Service', href: '' },
        { text: 'Service Agreement', href: '' },
        { text: 'Privacy Policy', href: '' },
        { text: 'Status', href: '' },
      ],
      getStarted: [
        { text: 'JS Client', href: '' },
        { text: 'CLI', href: '' },
        { text: 'Web UI', href: '' },
        { text: 'Open an issue', href: '' },
      ],
    },
    socialNetworks: [
      {
        name: 'Discord',
        description: 'Get involved',
        href: 'https://discord.gg/jwANgTVjgF',
        icon: 'i-simple-icons:discord',
      },
      {
        name: 'X',
        description: 'Read the latest',
        href: 'https://x.com/storachanetwork',
        icon: 'i-simple-icons:x',
      },
      {
        name: 'GitHub',
        description: 'Build with us',
        href: 'https://github.com/storacha-network',
        icon: 'i-simple-icons:github',
      },
      {
        name: 'Medium',
        description: 'Read our blog',
        href: 'https://medium.com/@storacha',
        icon: 'i-simple-icons:medium',
      },
      {
        name: 'Farcaster',
        description: 'Join discussion',
        href: 'https://warpcast.com/storacha',
        icon: 'i-simple-icons:farcaster',
      },
      {
        name: 'Reddit',
        description: 'See more',
        href: 'https://www.reddit.com/r/Storacha',
        icon: 'i-simple-icons:reddit',
      },
    ],
  },
})
