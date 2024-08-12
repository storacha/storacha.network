// @unocss-include

// global app config
export default defineAppConfig({
  dateFormat: 'MMM DD, YYYY',
  headerLinks: [{ text: 'Roadmap', href: '/roadmap' }],
  socialNetworks: [
    {
      name: 'Discord',
      description: 'Get involved',
      url: 'https://discord.gg/jwANgTVjgF',
      icon: 'i-simple-icons:discord',
    },
    {
      name: 'X',
      description: 'Read the latest',
      url: 'https://x.com/storachanetwork',
      icon: 'i-simple-icons:x',
    },
    {
      name: 'GitHub',
      description: 'Build with us',
      url: 'https://github.com/storacha-network',
      icon: 'i-simple-icons:github',
    },
    {
      name: 'Reddit',
      description: 'See more',
      url: 'https://www.reddit.com/r/Storacha',
      icon: 'i-simple-icons:reddit',
    },
    {
      name: 'Farcaster',
      description: 'Join discussion',
      url: 'https://warpcast.com/storacha',
      icon: 'i-simple-icons:farcaster',
    },
    {
      name: 'Medium',
      description: 'Read our blog',
      url: 'https://medium.com/@storacha',
      icon: 'i-simple-icons:medium',
    },
  ],
  footerLinks: {
    resources: [
      { text: 'Quickstart Guide', url: '' },
      { text: 'FAQ', url: '' },
      { text: 'Contact Us', url: '' },
      { text: 'Terms of Service', url: '' },
      { text: 'Service Agreement', url: '' },
      { text: 'Privacy Policy', url: '' },
      { text: 'Status', url: '' },
    ],
    getStarted: [
      { text: 'JS Client', url: '' },
      { text: 'CLI', url: '' },
      { text: 'Web UI', url: '' },
      { text: 'Open an issue', url: '' },
    ],
  },
  email: 'hello@storacha.network',
  mailingList: {
    icon: 'i-carbon:email',
    url: 'https://945c6cfe.sibforms.com/serve/MUIFAJsqje9uA4owcVGYYaQWZarreW_oOzT9j0aXOY1QcOdsXQ7ZjvWvrpXKqNm9sBilY3Pum8s9CyPAkA2ELLEyJp3DVvzEDFg-Ov967IegSH6PXRAG6ulFhavIwebzTu3XsMZbpnyWbsDp5hexye1aXcFs4C9oIFFJWX2Aar8ElyUJDCPSsoeMAdj6puyREL1zUrjNpq2ZobYx',
    label: 'Join our mailing list',
  },
})
