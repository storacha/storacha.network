<template>
  <div class="animate-fade-in">
    <Header :site-name="useSiteConfig().name" class="font-medium heading" />
    <main class="min-h-70vh">
      <slot />
    </main>
    <Footer class="p3" />
  </div>
</template>
