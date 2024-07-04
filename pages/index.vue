<template>
  <TransitionProvider>
    <Section class="bg-brand-4">
      <Hero
        headline="Super h🔥t decentralized data at scale."
        description="COMING SOON 2024"
        :action="{ text: 'SIGN UP FOR EARLY ACCESS', href: $config.public.mailingListUrl }"
      />
    </Section>
    <Section full-width>
      <MissionBlock />
    </Section>
    <Section class="bg-brand-4 py-6 sm:py-12" full-width>
      <Roadmap />
    </Section>
    <Section full-width>
      <Community />
    </Section>
  </TransitionProvider>
</template>
