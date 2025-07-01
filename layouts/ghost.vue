<!-- layouts/ghost.vue - Clean and Simple -->
<script setup>
const siteConfig = useSiteConfig()
</script>

<template>
  <div class="ghost-layout">
    <!-- Simple header for Ghost pages -->
    <header class="ghost-header">
      <div class="container">
        <nav class="nav">
          <NuxtLink to="/" class="logo">
            {{ siteConfig.name }}
          </NuxtLink>
          <div class="nav-links">
            <NuxtLink to="/ghost" class="nav-link">
              Blog
            </NuxtLink>
            <NuxtLink to="/" class="nav-link">
              Home
            </NuxtLink>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main content area -->
    <main class="ghost-main">
      <slot />
    </main>

    <!-- Simple footer -->
    <footer class="ghost-footer">
      <div class="container">
        <div class="footer-content">
          <NuxtLink to="/ghost" class="footer-link">
            ← Back to Blog
          </NuxtLink>
          <span class="footer-text">
            Powered by Ghost CMS
          </span>
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.ghost-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #15171a;
  text-decoration: none;
  transition: color 0.2s ease;
}

.logo:hover {
  color: #0084ff;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #626d79;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #0084ff;
}

.nav-link.router-link-active {
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

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #626d79;
  font-size: 0.875rem;
}

.footer-link {
  color: #0084ff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-text {
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .nav-links {
    gap: 1rem;
  }
}</style>