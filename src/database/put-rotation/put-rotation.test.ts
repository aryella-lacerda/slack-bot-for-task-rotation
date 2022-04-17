import { GetCommand } from '@aws-sdk/lib-dynamodb'

import { getDynamoDBClient } from '@database/get-dynamodb-client'
import { Rotation } from '@entities'

import { putRotation } from './put-rotation'

const ddb = getDynamoDBClient()

it('should insert item into table', async () => {
  // Arrange
  const id = '123132123'
  const next_rotation_at = '2022-04-30T11:22:06.082Z'
  const item: Rotation = {
    id,
    next_rotation_at,
    created_at: '2022-03-30T11:22:06.082Z',
    task: 'daily meeting host',
    user_list: ['@U02AMETS1UG', '@U01G65M5LQ4', '@U02FVLR9AE9'],
    channel_id: 'C0339UGLTHS',
    next_user: '@U02AMETS1UG',
    frequency: 1,
  }

  // Act
  await putRotation(item)

  // Assert
  const { Item } = await ddb.send(
    new GetCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Key: { id },
    })
  )

  expect(Item).toEqual(item)
})
