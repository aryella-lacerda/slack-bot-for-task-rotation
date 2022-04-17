import { getDynamoDBClient } from '@database/get-dynamodb-client'
import seed from '@seeds/rotations.json'
import { seedTables } from '@tests/utils'

import { getRotationById, MISSING_GET_PARAMS } from './get-rotation-by-id'
const ddb = getDynamoDBClient()

it('should throw error if not passed a rotationId argument', async () => {
  // @ts-expect-error testing invalid params
  await expect(() => getRotationById()).rejects.toThrow(MISSING_GET_PARAMS)
})

it('should return rotation if passed an existing rotationId', async () => {
  // Arrange
  await seedTables(ddb, [
    {
      table: process.env.ROTATIONS_TABLE,
      items: seed,
    },
  ])

  // Act
  const item = await getRotationById(seed[0].id)

  // Assert
  expect(item).toStrictEqual(seed[0])
})

it('should return undefined if passed a nonexistant rotationId', async () => {
  // Act
  const item = await getRotationById('nonexistant id')

  // Assert
  expect(item).toBeUndefined()
})
