export function useSocialNetwork(name: string) {
  const appConfig = useAppConfig()
  return appConfig.socialNetworks.find(s => s.name.toLowerCase() === name.toLowerCase())
}
