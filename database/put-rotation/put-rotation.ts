import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import { PutCommand } from '@aws-sdk/lib-dynamodb'

import { Rotation } from '../../entities/rotation'
import { getDynamoDBClient } from '../get-dynamodb-client'

const dynamodb = getDynamoDBClient()

export const putRotation = async (
  rotation: Pick<Rotation, 'task' | 'user_list' | 'channel_id' | 'next_user'>
) => {
  const item = {
    TableName: process.env.ROTATIONS_TABLE,
    Item: {
      id: uuid(),
      created_at: dayjs().toISOString(),
      next_rotation_at: dayjs().add(1, 'day').toISOString(),
      ...rotation,
    },
  }

  return dynamodb.send(new PutCommand(item))
}
