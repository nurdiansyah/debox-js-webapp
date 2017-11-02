/**
 * Merges two theme by concatenating values with the same keys
 * @param {object} [original] - Original theme object
 * @param {object} [mixin] - Mixing theme object
 * @returns {object} - Merged resulting theme
 */
const themeable = (original = {}, mixin) => {
  // don't merge if no mixin is passed
  if (!mixin) return original

  // merge theme by concatenating values with the same keys
  return Object.keys(mixin).reduce(
    // merging reducer
    (result, key) => {
      const originalValue = original[key]
      const mixinValue = mixin[key]

      let newValue

      // check if values are nested objects
      if (typeof originalValue === 'object' && typeof mixinValue === 'object') {
        // go recursive
        newValue = themeable(originalValue, mixinValue)
      } else {
        // either concat or take mixin value
        newValue = originalValue ? `${originalValue} ${mixinValue}` : mixinValue
      }

      return {
        ...result,
        [key]: newValue
      }
    },

    // use original theme as an acc
    original
  )
}

export default themeable
