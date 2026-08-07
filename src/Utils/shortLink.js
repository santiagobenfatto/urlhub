export const buildShortUrl = (alias) => {
  if (!alias) return ''
  const clean = alias.startsWith('/') ? alias.slice(1) : alias
  return `${window.location.origin}/${clean}`
}
