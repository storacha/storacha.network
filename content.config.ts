// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'data', 
      source: 'ecosystem/projects/*.yml',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        url: z.string(),
        categories: z.array(z.string()),
        icon: z.string().optional()
      })
    }),
    categories: defineCollection({
      type: 'data',
      source: 'ecosystem/categories.yml', 
      schema: z.object({
        body: z.array(z.object({
          id: z.string(),
          name: z.string(), 
          icon: z.string()
        }))
      })
    })
  }
})