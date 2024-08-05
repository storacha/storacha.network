<template>
  <TransitionProvider>
    <Section class="bg-brand-4">
      <Hero
        class="min-h-150"
        title="Roadmap"
        description="Igniting the path to decentralized storage 🔥"
        :actions="[{ label: 'Start Storing', href: '/' }, { label: 'Learn More', href: '/', secondary: true }]"
      />
    </Section>
    <Section class="bg-brand-4" full-width padding>
      <Roadmap />
    </Section>
  </TransitionProvider>
</template>
