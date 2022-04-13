import { DeleteCommand } from '@aws-sdk/lib-dynamodb'

import { getDynamoDBClient } from '@database/get-dynamodb-client'

const dynamodb = getDynamoDBClient()

export const MISSING_DELETE_PARAMS =
  'Rotation id and next_rotation_at timestamp required for delete operation'

type RotationToDelete = {
  id: string
  next_rotation_at: string
}

export const deleteRotation = async ({
  id,
  next_rotation_at,
}: RotationToDelete) => {
  if (!id || !next_rotation_at) {
    throw new Error(MISSING_DELETE_PARAMS)
  }

  return dynamodb.send(
    new DeleteCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Key: {
        id,
        next_rotation_at,
      },
    })
  )
}
