export function useSocialNetwork(name: string) {
  const socialNetworks = useActions('socialNetworks')
  return socialNetworks.find(s => s.name.toLowerCase() === name.toLowerCase())
}
