import { getDynamoDBClient } from '@database/get-dynamodb-client'
import rotations from '@seeds/rotations.json'
import { seedTables } from '@tests/utils'

import { getAllRotations } from './get-all-rotations'

const ddb = getDynamoDBClient()

it('should get all rotations in table', async () => {
  // Arrange
  await seedTables(ddb, [
    {
      table: process.env.ROTATIONS_TABLE,
      items: rotations,
    },
  ])

  // Act
  const items = await getAllRotations()
  // Assert
  expect(items).toEqual(rotations)
})
