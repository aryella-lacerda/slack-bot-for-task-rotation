import { GetCommand } from '@aws-sdk/lib-dynamodb'

import { getDynamoDBClient } from '@database/get-dynamodb-client'
import seed from '@seeds/rotations.json'
import { seedTables } from '@tests/utils'

import { deleteRotation, MISSING_DELETE_PARAMS } from './delete-rotation'

const ddb = getDynamoDBClient()

it('should throw an error if not passed a rotation id', async () => {
  // @ts-expect-error testing incorrect arguments
  await expect(deleteRotation()).rejects.toThrow(MISSING_DELETE_PARAMS)
})

it('should delete the given rotation if passed a rotation id', async () => {
  // Arrange
  await seedTables(ddb, [
    {
      table: process.env.ROTATIONS_TABLE,
      items: seed,
    },
  ])

  // Act
  await deleteRotation(seed[0].id)

  // Assert
  const { Item } = await ddb.send(
    new GetCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Key: {
        id: seed[0].id,
      },
    })
  )

  expect(Item).toBeUndefined()
})
