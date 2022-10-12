/**
 * User-Defined Type Guard:
 * Narrow an unknown value down to an object with the given key.
 */
export const has = <Key extends PropertyKey>(
  obj: unknown,
  key: Key,
): obj is Record<Key, unknown> =>
  typeof obj === 'object' && obj !== null && key in obj

/**
 * User-Defined Type Guard:
 * Declare whether something is a key of an object.
 * Useful for things like Object.keys(myObject), which is string[]
 * (see https://stackoverflow.com/a/55012175 for why that is)
 */
export const isKeyOf = <T>(key: unknown, obj: T): key is keyof T =>
  String(key) in obj

/**
 * User-Defined Type Guard:
 * Useful for things like filtering undefined/null from arrays
 */
export const notVoid = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

/**
 * User-Defined Type:
 * The return value from JSON.parse()
 * https://github.com/microsoft/TypeScript/issues/1897
 */
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

/**
 * User-Defined Type:
 * The possible values of an object
 * https://stackoverflow.com/a/49286056
 */
export type ValueOf<T> = T[keyof T]

/**
 * Gently assert to TS that code should be unreachable.
 * Don't actually throw (in case the runtime does the unexpected).
 * Useful for enforcing exhaustive switch statements.
 */
export const hopeNever = (value: never): void => {
  console.error('Unexpected never', value)
}
