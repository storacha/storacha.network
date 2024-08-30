<template>
  <TransitionProvider>
    <Section class="bg-brand-4">
      <Hero
        class="min-h-150"
        eyebrow="Learn More"
        title="Roadmap"
        description="Igniting the path to decentralized storage 🔥"
        :actions="[{ text: 'Start Storing', href: '/' }, { text: 'Learn More', href: '/', secondary: true }]"
      />
    </Section>
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-brand-2' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                About Storacha
              </Heading>
              <div class="prose p1">
                <p>
                  At Storacha, we're setting the storage world on fire! Storacha is a cutting-edge, decentralized hot storage solution designed to give you blazing-fast access to your data without relying on traditional, centralized systems. We’re all about true data freedom, where you own your data and control who gets to see it.
                </p>
                <p>
                  Our mission is to deliver a high-performance, intuitive solution that outshines the old ways of storage. Whether you’re storing gaming assets, multimedia content, or blockchain data, Storacha has you covered.
                </p>
                <p>
                  We balance decentralization with performance through:
                  <ul>
                    <li>Open Access: Anyone can join and contribute.</li>
                    <li>Easy Exit: Data owners can move their data anytime.</li>
                  </ul>
                  Turn up the heat with Storacha and spark the future of decentralized storage.
                </p>
              </div>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <Section class="bg-brand-4 color-brand-3" full-width padding>
      <Roadmap />
    </Section>
  </TransitionProvider>
</template>
