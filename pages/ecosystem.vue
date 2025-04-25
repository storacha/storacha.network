<script lang="ts" setup>

</script>

<template>
  <TransitionProvider>
    <Section class="ecosystem-bg bg-brand-4">
      <Hero
        class="min-h-150 lg:min-h-180"
        eyebrow="Learn More"
        title="Storacha Ecosystem"
        description="Discover how innovative projects are leveraging Storacha’s blazing-fast, secure, and scalable hot storage solution to push the boundaries of what's possible."
      />
    </Section>
    <Section class="bg-white" padding>
      <EcosystemGrid />
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss" scoped>
@screen md {
  .ecosystem-bg {
    background: url(/img/ecosystem/hero.png) no-repeat bottom right 10%;
    background-size: auto 75%;
  }
}
@screen lg {
  .ecosystem-bg {
    background-size: auto 78%;
  }
}
@screen xl {
  .ecosystem-bg {
    background-size: auto 90%;
  }
}
</style>
