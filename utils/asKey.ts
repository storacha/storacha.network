export default (str: string) => {
  return str.toLowerCase().replace(/\s/g, '-')
}
