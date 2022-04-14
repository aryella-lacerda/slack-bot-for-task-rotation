import dayjs from 'dayjs'

import { getDynamoDBClient } from '@database/get-dynamodb-client'
import { getRotationsByChannelId } from '@database/get-rotations-by-channel-id'
import { Rotation } from '@entities'
import rotations from '@seeds/rotations.json'
import { seedTables } from '@tests/utils'

const sortByDate = (a: Rotation, b: Rotation) =>
  dayjs(a.created_at).unix() - dayjs(b.created_at).unix()

const ddb = getDynamoDBClient()

it('should get all rotations linked to a channel id', async () => {
  // Arrange
  await seedTables(ddb, [
    {
      table: process.env.ROTATIONS_TABLE,
      items: rotations,
    },
  ])

  const channel_id = rotations[0].channel_id
  const rotationsInChannel = (rotations as Rotation[]).filter(
    (rotation) => rotation.channel_id === channel_id
  )

  // Act
  const rotationsFound = await getRotationsByChannelId(channel_id)

  // Assert
  rotationsFound.sort(sortByDate)
  rotationsInChannel.sort(sortByDate)
  expect(rotationsFound).toEqual(rotationsInChannel)
})
