import GhostContentAPI from '@tryghost/content-api'

export function useGhostClient() {
  const config = useRuntimeConfig()
  const { url, key, version } = config.public.ghost

  // Create API instance with site credentials
  const api = new GhostContentAPI({
    url,
    key,
    version,
  })

  return { api }
}
