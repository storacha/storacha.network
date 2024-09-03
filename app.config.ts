// @unocss-include

// global app config
export default defineAppConfig({
  dateFormat: 'MMM DD, YYYY',
  actions: {
    start: { text: 'Start Storing', href: 'https://console.storacha.network/' },
    docs: { text: 'Docs', href: 'https://docs.storacha.network' },
    headerLinks: [
      { text: 'Roadmap', href: '/roadmap' },
      { text: 'Ecosystem', href: '/ecosystem' },
      { text: 'Node Providers', href: '/node-providers' },
      { text: 'Blog', href: '/blog' },
    ],
    mailingList: {
      icon: 'i-carbon:email',
      href: 'https://945c6cfe.sibforms.com/serve/MUIFAKzuXT1iiGUeRfGD3adZ86kpwArveQS6J5AdNNS_2B4qLpiEsaIwadUSJt8EtwfEKJo65KWl7Q0qjJP96f58WsvHw5rrvow1Ut2yrrjNRXml4wgDqZuekqqWpVUw06B1KjcAmMGY69QYkqYmSiwRgNHGwUbYb7ai8o-1vCmVcxyYVJ5Xd5Wu9G-V2QNREHAAxgm8KfdegPRi',
      text: 'Join mailing list',
    },
    email: { text: 'Contact Us', href: 'mailto:support@storacha.network' },
    footerLinks: {
      resources: [
        { text: 'Quickstart Guide', href: 'https://docs.storacha.network/quickstart' },
        { text: 'FAQ', href: 'https://docs.storacha.network/faq' },
        { text: 'Contact Us', href: 'mailto:support@storacha.network' },
        { text: 'Terms of Service', href: 'https://docs.storacha.network/terms' },
        { text: 'Service Agreement', href: 'https://docs.storacha.network/service-level-agreement' },
        { text: 'Privacy Policy', href: 'https://docs.storacha.network/privacy-policy' },
        { text: 'Status', href: 'https://status.storacha.network' },
      ],
      getStarted: [
        { text: 'JS Client', href: 'https://github.com/storacha-network/w3up/tree/main/packages/w3up-client#readme' },
        { text: 'CLI', href: 'https://docs.storacha.network/w3cli' },
        { text: 'Web UI', href: 'https://console.storacha.network' },
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
