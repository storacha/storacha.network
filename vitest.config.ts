import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // Enable DOM environment for component testing
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom'
      }
    },
    // Test patterns
    include: [
      'tests/**/*.test.{js,ts}',
      'tests/**/*.spec.{js,ts}',
      '**/__tests__/**/*.{js,ts}',
      '**/*.{test,spec}.{js,ts}'
    ],
    exclude: [
      'node_modules',
      'dist',
      '.nuxt',
      'coverage',
      'e2e/**'
    ],
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'dist/',
        '.nuxt/',
        'coverage/',
        'e2e/',
        '**/*.config.{js,ts}',
        '**/*.d.ts',
        'tests/**',
        'vitest.config.ts'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    // Global test setup
    globals: true,
    // Test timeout
    testTimeout: 10000,
    // Concurrent tests
    pool: 'forks',
    // Setup files
    setupFiles: ['./tests/setup.ts']
  }
})
