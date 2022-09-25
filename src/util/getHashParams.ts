interface HashParams {
  [key: string]: string | number
}

/**
 * Extract hash query params from URL
 */
export const getHashParams = () => {
  const params: HashParams = {}
  const hash = window.location.hash
  if (!hash.startsWith('#')) return params // Empty
  const contents = hash.slice(1)
  const parts = contents.split('&')
  parts.forEach((part) => {
    const [key, val] = part.split('=')
    if (key && val) {
      params[key] = isNumeric(val) ? Number(val) : val
    }
  })
  return params
}

const isNumeric = (value: unknown) => {
  const num = Number(value)
  return !Number.isNaN(num)
}
