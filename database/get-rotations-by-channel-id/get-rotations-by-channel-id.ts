import { QueryCommand } from '@aws-sdk/lib-dynamodb'

import { getDynamoDBClient } from '@database/get-dynamodb-client'
import { Rotation } from '@entities'

const dynamodb = getDynamoDBClient()

export const getRotationsByChannelId = async (channelID: string) => {
  const response = await dynamodb.send(
    new QueryCommand({
      TableName: process.env.ROTATIONS_TABLE,
      IndexName: 'ByChannelId',
      KeyConditionExpression: 'channel_id = :channelID',
      ExpressionAttributeValues: {
        ':channelID': channelID,
      },
    })
  )

  return response.Items as Rotation[]
}
