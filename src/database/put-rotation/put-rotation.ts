import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { RotationFrequency } from '@constants'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

import { getDynamoDBClient } from '@database/get-dynamodb-client'
import { Rotation } from '@entities'
import * as utils from '@utils'

const dynamodb = getDynamoDBClient()

export const putRotation = async (rotation: Partial<Rotation>) => {
  const item: Rotation = {
    // Default values
    id: uuid(),
    created_at: dayjs().toISOString(),
    next_rotation_at: utils.roundToNearestHour().add(1, 'day').toISOString(),
    frequency: RotationFrequency.EVERY_DAY,
    task: '',
    user_list: [],
    channel_id: '',
    next_user: '',

    // Overwrite relevant keys
    ...rotation,
  }

  await dynamodb.send(
    new PutCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Item: item,
    })
  )

  return item
}
