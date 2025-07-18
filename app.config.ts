// @unocss-include

// global app config
export default defineAppConfig({
  dateFormat: 'MMM DD, YYYY',
  notice: {
    text: 'EARN RACHA POINTS AND STORAGE CREDITS BY REFERRING FRIENDS <u>LEARN MORE</u>',
    href: '/referrals',
    displayUntil: '2025-12-31', // use ISO date format or final day +1 in yyyy-mm-dd
  },
  actions: {
    start: { text: 'Start Storing', href: 'https://console.storacha.network/' },
    docs: { text: 'Docs', href: 'https://docs.storacha.network', secondary: true },
    headerLinks: [
       {
        text: 'Product',
        dropdown: [
          { text: 'Bluesky Storage', href: 'https://bsky.storage' },
          { text: 'Storacha AI', href: 'https://storacha.ai' },
          { text: 'Storacha Console', href: 'https://console.storacha.network/' },
          { text: 'Roadmap', href: '/roadmap' },
        ]
      },
      { text: 'Referrals', href: '/referrals'},
      { text: 'Ecosystem', href: '/ecosystem' },
      { text: 'Node Providers', href: '/node-providers' },
      { text: 'Blog', href: '/blog' },
      { text: 'Docs', href: 'https://docs.storacha.network' },
    ],
    mailingList: {
      icon: 'i-carbon:email',
      href: 'https://945c6cfe.sibforms.com/serve/MUIFAOom2AtelLIYvFII91Z7ohm-e_pdRCS6DYtA0a5Cvn5DfuG0YQrPRnKbp7OXbJq4ogT7oejPXZFPtyS3L6ZgUvL0tJ3bP6_7sgO6kprVKqTHJECQ4WJeangGIU7MpK0mMx-3XVF3v6sNSYq2Vy1LaAltLwmnB-DE7QjXdLk9XM_AcErDhQoYPqms63o_IeGxnirl6AJcYuCO',
      text: 'Join Mailing List',
      outline: true,
    },
    nodeWaitlist: {
      icon: 'i-carbon:email',
      href: 'https://945c6cfe.sibforms.com/serve/MUIFAG8iCnsvJLc29QEJIeSCk-XQ5SVO9W9D8oO42tSXD_b_b-Ejx_WguwyuAThVF0DCuJ5cAILyu5IJjUwrj37aB8kPxK7mvSv5ypCdFXqaQ3s0caqU0eCVjLGshIXxr6YWvjnjMcZ96bmuOHRP69wjYM6V-gcDoXxBRm9676J-EYd-8xWgsLfiGVMbcSsY1hwX3g5NUF35wxsW',
      text: 'Join Waitlist',
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
        href: 'https://discord.gg/pqa6Dn6RnP',
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
        name: 'YouTube',
        description: 'Watch our demos',
        href: 'https://www.youtube.com/@StorachaNetwork',
        icon: 'i-simple-icons:youtube',
      },
      {
        name: 'Farcaster',
        description: 'Join the discussion',
        href: 'https://warpcast.com/storacha',
        icon: 'i-simple-icons:farcaster',
      },
      {
        name: 'Bluesky',
        description: 'Join the conversation',
        href: 'https://bsky.app/profile/storacha.network',
        icon: 'i-simple-icons:bluesky',
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