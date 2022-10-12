export interface HashRoute {
  path: string
  params: HashParams
}

type HashParams = Record<string, string | number>

const EMPTY_ROUTE = { path: '', params: {} }

/**
 * Parse hash-based routes such as:
 * #path/to/thing?arg1=foo&arg2=bar
 */
export const parseHashRoute = (hash: string): HashRoute => {
  if (!hash.startsWith('#')) return EMPTY_ROUTE
  const contents = hash.slice(1)
  if (!contents) return EMPTY_ROUTE
  const parts = contents.split('?')
  const path = parts[0] ?? ''
  const paramsString = parts[1] ?? ''
  const params = parseHashParams(paramsString)
  return { path, params }
}

const parseHashParams = (paramsString: string): HashParams => {
  const params: HashParams = {}
  const parts = paramsString.split('&')
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
