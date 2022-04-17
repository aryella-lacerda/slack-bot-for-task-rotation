import { DeleteCommand } from '@aws-sdk/lib-dynamodb'

import { getDynamoDBClient } from '@database/get-dynamodb-client'

const dynamodb = getDynamoDBClient()

export const MISSING_DELETE_PARAMS = 'Rotation ID required for delete operation'

export const deleteRotation = async (id: string) => {
  if (!id) {
    throw new Error(MISSING_DELETE_PARAMS)
  }

  return dynamodb.send(
    new DeleteCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Key: {
        id,
      },
    })
  )
}
