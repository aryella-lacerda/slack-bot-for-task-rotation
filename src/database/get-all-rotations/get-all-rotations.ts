import { ScanCommand } from '@aws-sdk/lib-dynamodb'

import { getDynamoDBClient } from '@database/get-dynamodb-client'
import { Rotation } from '@entities'

const dynamodb = getDynamoDBClient()

export const getAllRotations = async () => {
  const rotations = await dynamodb.send(
    new ScanCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Select: 'ALL_ATTRIBUTES',
    })
  )

  return rotations.Items as Rotation[]
}
