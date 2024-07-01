<template>
  <ContentDoc v-slot="{ doc }">
    <TransitionProvider>
      <Section :bg="{ from: '#CFD4DC', to: '#EDF1F4' }">
        <div class="mt-20 min-h-30vh flex items-center">
          <div class="max-w-prose">
            <Heading type="h1" class="text-dark">
              {{ doc.title }}
            </Heading>
          </div>
        </div>
      </Section>
    </TransitionProvider>
    <Section>
      <article class="min-h-40vh pt-5 prose">
        <ContentRenderer :value="doc" />
      </article>
    </Section>
  </ContentDoc>
</template>

<style lang="postcss">
.prose :is(h1, h2, h3, h4, h5, h6) {
  scroll-margin-top: 100px;
}
.prose :is(h1, h2, h3, h4, h5, h6) a {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
