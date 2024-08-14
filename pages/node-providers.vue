<script lang="ts" setup>
const appConfig = useAppConfig()

const gitHubUrl = appConfig.socialNetworks.find(s => s.name === 'Github')?.url
const discordUrl = appConfig.socialNetworks.find(s => s.name === 'Discord')?.url
const mailingListUrl = appConfig.mailingList.url
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4">
      <Hero
        class="min-h-150"
        title="Node Providers"
        description="Join the waitlist to be the first to participate!"
        :actions="[
          { label: 'Join Waitlist', href: mailingListUrl },
          { label: 'Join Community', href: discordUrl, secondary: true }]"
      />
    </Section>
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-brand-2' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                How can you engage?
              </Heading>
              <div class="prose p1">
                <p>
                  Storacha is open sauce. We need you. While you wait to run your own nodes, contribute in other ways:
                </p>
                <p>
                  <ul>
                    <li>Get started with the w3cli on Github.</li>
                    <li>Collaborate with our dev team on Discord.</li>
                    <li>Learn about the network and future node types below.</li>
                  </ul>
                </p>
              </div>
              <Btn :href="gitHubUrl">
                Get Started!
              </Btn>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                Recommended Hardware
              </Heading>
              <div class="prose p1">
                <p>
                  The Storacha network doesn't discriminate. Got a solid home server, or a sleek setup in a data center? As long as you have a trusty internet connection, you're in! We're here to make joining the party easy for everyone. Detailed hardware recommendations will be served hot with each new node type release. Stay tuned and follow us on Discord and X!
                </p>
              </div>
            </div>
          </div>
        </SplitCell>
        <SplitCell :bg="{ outer: 'bg-brand-2' }" />
      </Split>
    </Section>
  </TransitionProvider>
</template>
