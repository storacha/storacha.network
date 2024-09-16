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
      href: 'https://945c6cfe.sibforms.com/serve/MUIFANdsXk2F0aFIaq6KQzBpojKAoGeN3FdEXKjlP2hZb_H-cBfO4fjXDMnywa3KaC1yOM3SxKoh3Fzzi5efQC7D6iZkhrUP_Ld7_fZ-Dp-5-MpNy6IBEn6c0vMoBaGXfRJoyblfZ8bDisfV6JL1gVjNAMkPl-Fsi9zTXwGQJgfWdLkdQhxz6bU0MM2LHUT0tD67Io1UgdE0INRv',
      text: 'Join mailing list',
    },
    email: { text: 'Contact Us', href: 'mailto:support@storacha.network' },
    footerLinks: {
      resources: [
        { text: 'Quickstart Guide', href: 'https://docs.storacha.network/quickstart' },
        { text: 'FAQ', href: 'https://docs.storacha.network/faq' },
        { text: 'Contact Us', href: 'mailto:support@storacha.network' },
        { text: 'Terms of Service', href: 'https://docs.storacha.network/terms' },
        { text: 'Privacy Policy', href: 'https://docs.storacha.network/privacy-policy' },
        { text: 'Status', href: 'https://status.storacha.network' },
      ],
      getStarted: [
        { text: 'JS Client', href: 'https://github.com/storacha/w3up/tree/main/packages/w3up-client#readme' },
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
        href: 'https://github.com/storacha',
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
