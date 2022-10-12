import { TableItem } from './data'

/**
 * Upper-case the first letter of a string
 */
export const capitalize = ([first, ...rest]: string) =>
  [first?.toLocaleUpperCase(), ...rest].join('')

/**
 * Download all selected items
 *
 * Note: only status=available items are downloaded
 *
 * Assumption:
 * - Since the mockup showed !available items as still having enabled checkboxes
 *   and hover states, I guessed that they could still be selected, and availability
 *   validation would happen in this final download step
 * - This could also be achieved through the structure of the UI elements, by disabling
 *   hover & selection of !available items (+ maybe an explanation tooltip)
 */
export const downloadItems = (items: TableItem[]) => {
  // Bucket items by availability
  const availableItems: TableItem[] = []
  const unavailableItems: TableItem[] = []
  items.forEach((item) => {
    item.status === 'available'
      ? availableItems.push(item)
      : unavailableItems.push(item)
  })

  // Craft download message for user
  const messageLines: string[] = []
  if (availableItems.length) {
    messageLines.push('Downloading available items')
    availableItems.forEach((item) =>
      messageLines.push(`  ${item.device}: ${item.path}`),
    )
    // Fence post
    if (unavailableItems.length) messageLines.push('')
  }
  if (unavailableItems.length) {
    messageLines.push('Skipping unavailable items')
    unavailableItems.forEach((item) =>
      messageLines.push(`  ${item.device}: ${item.path}`),
    )
  }

  // Alert message
  const message = messageLines.join('\n')
  alert(message)
}
