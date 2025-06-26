<!-- layouts/ghost.vue -->
<script setup>
// This layout is specifically for Ghost pages
// It provides the ghost-content-isolation environment

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="ghost-layout">
    <!-- Minimal header for Ghost pages -->
    <header class="ghost-header">
      <div class="ghost-container">
        <nav class="ghost-nav">
          <a href="/" class="ghost-home-link">
            {{ siteConfig.name }}
          </a>
          <a href="/ghost" class="ghost-blog-link">
            Blog
          </a>
        </nav>
      </div>
    </header>

    <!-- Ghost content area with CSS isolation -->
    <main class="ghost-main">
      <div class="ghost-content-isolation">
        <slot />
      </div>
    </main>

    <!-- Minimal footer for Ghost pages -->
    <footer class="ghost-footer">
      <div class="ghost-container">
        <div class="ghost-footer-content">
          <a href="/ghost" class="ghost-footer-link">← Back to Blog</a>
          <span class="ghost-footer-text">Powered by Ghost CMS</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.ghost-layout {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.ghost-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.ghost-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.ghost-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ghost-home-link {
  font-size: 1.5rem;
  font-weight: 700;
  color: #15171a;
  text-decoration: none;
}

.ghost-home-link:hover {
  color: #0084ff;
}

.ghost-blog-link {
  color: #626d79;
  text-decoration: none;
  font-weight: 500;
}

.ghost-blog-link:hover {
  color: #0084ff;
}

.ghost-main {
  flex: 1;
  padding: 2rem 0;
}

.ghost-footer {
  background: #f8f9fa;
  border-top: 1px solid #e5e5e5;
  padding: 2rem 0;
  margin-top: auto;
}

.ghost-footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #626d79;
  font-size: 0.875rem;
}

.ghost-footer-link {
  color: #0084ff;
  text-decoration: none;
  font-weight: 500;
}

.ghost-footer-link:hover {
  text-decoration: underline;
}

.ghost-footer-text {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .ghost-container {
    padding: 0 1rem;
  }
  
  .ghost-footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>