import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { deleteRotation, MISSING_DELETE_PARAMS } from './delete-rotation'
import { getDynamoDBClient } from '@database/get-dynamodb-client'
import seed from '../../seed/rotations.json'

const ddb = getDynamoDBClient()

it('should throw an error if not passed a rotation id', async () => {
  const toDelete = {
    next_rotation_at: '2022-04-30T11:22:06.082Z',
  }

  // @ts-expect-error testing incorrect arguments
  await expect(deleteRotation(toDelete)).rejects.toThrow(MISSING_DELETE_PARAMS)
})

it('should throw an error if not passed a next_rotation_at timestamp', async () => {
  const toDelete = {
    id: '03ce1f90-5a9c-4658-8a53-8e4a4892896f',
  }

  // @ts-expect-error testing incorrect arguments
  await expect(deleteRotation(toDelete)).rejects.toThrow(MISSING_DELETE_PARAMS)
})

it('should delete the given rotation if passed a rotation id', async () => {
  // Arrange
  // --> The database is seeded in jest.setup.ts, this is the first item
  const rotationToDelete = {
    id: seed[0].id,
    next_rotation_at: seed[0].next_rotation_at,
  }

  // Act
  await deleteRotation(rotationToDelete)

  // Assert
  const { Item } = await ddb.send(
    new GetCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Key: rotationToDelete,
    })
  )

  expect(Item).toBeUndefined()
})
