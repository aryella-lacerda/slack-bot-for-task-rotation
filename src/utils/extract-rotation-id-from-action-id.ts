const rotationId = /.*?(?=-select)/gm

/**
 * @param actionId
 * @description Match everything up to, but not including, the first occurence of the string "-select"
 * @example extractRotationIdFromActionId("a0a6aa0a-b33c-4c00-adf8-76984dd6b9e9-select-rotation-frequency") returns "a0a6aa0a-b33c-4c00-adf8-76984dd6b9e9"
 * @returns A string containing the matched rotation Id, if found. Returns undefined otherwise.
 */
export const extractRotationIdFromActionId = (actionId: string) => {
  return actionId.match(rotationId)?.[0].trim()
}
