import { GetCommand } from '@aws-sdk/lib-dynamodb'

import { getDynamoDBClient } from '@database/get-dynamodb-client'
import { Rotation } from '@entities'

const dynamodb = getDynamoDBClient()

export const MISSING_GET_PARAMS = 'Rotation ID required for GET operation'

export const getRotationById = async (id: string) => {
  if (!id) {
    throw new Error(MISSING_GET_PARAMS)
  }

  const { Item } = await dynamodb.send(
    new GetCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Key: {
        id,
      },
    })
  )

  return Item as Rotation
}
