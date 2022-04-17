import { extractRotationIdFromActionId } from './extract-rotation-id-from-action-id'

it('should extract rotation id if it exists', () => {
  const rotationId = 'a0a6aa0a-b33c-4c00-adf8-76984dd6b9e9'
  const actionId = `${rotationId}-select-rotation-frequency`

  expect(extractRotationIdFromActionId(actionId)).toBe(rotationId)
})

it('should return undefined if rotation id does not exist', () => {
  const actionId = `select-rotation-frequency`

  expect(extractRotationIdFromActionId(actionId)).toBeUndefined()
})
