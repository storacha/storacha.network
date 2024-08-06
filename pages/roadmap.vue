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
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-brand-2' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3 md:my-24">
            <div>
              <Heading type="h2" class="font-medium">
                About Storacha
              </Heading>
              <p class="mt-6 p1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil commodi mollitia, obcaecati tempora ipsam velit cum fuga delectus iure optio molestias similique eius aliquam? Amet vel neque dolore nisi minus?
              </p>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <Section class="bg-brand-4" full-width padding>
      <Roadmap />
    </Section>
  </TransitionProvider>
</template>
