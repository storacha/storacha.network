import type { AppConfig } from 'nuxt/schema'

export function useActions<T extends keyof AppConfig['actions']>(actionKey: T): AppConfig['actions'][T] {
  const { actions } = useAppConfig()
  if (!actions[actionKey]) {
    throw new Error(`Action ${actionKey} not found in app config`)
  }
  return actions[actionKey]
}
