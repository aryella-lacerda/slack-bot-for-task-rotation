import { StaticSelectAction } from '@slack/bolt'
import dayjs from 'dayjs'

import * as database from '@database'
import { startSlackApp } from '@handlers/start-slack-app'
import { UNEXPECTED_ERROR } from '@handlers/user-messages'
import * as utils from '@utils'

const { app, awsLambdaReceiver } = startSlackApp()

app.action(/.*-select-rotation-frequency/gm, async ({ payload, ack }) => {
  const _payload = payload as StaticSelectAction
  const acknowledge = utils.generateAckFunction(ack)

  try {
    console.log('IN SELECT ROTATION FREQUENCY', { _payload })

    // TODO: Make frequency a string?
    const frequency = Number(_payload.selected_option.value)

    const rotationId = utils.extractRotationIdFromActionId(_payload.action_id)
    const rotation = await database.getRotationById(rotationId)

    // Calculate next rotation date
    const outdatedNextRotationAt = dayjs(rotation.next_rotation_at)
    const updatedNextRotationAt = dayjs()
      .hour(outdatedNextRotationAt.hour()) // Get hour and minute from old timestamp
      .minute(outdatedNextRotationAt.minute())
      .add(frequency, 'days')
      .toISOString()

    const updatedRotation = {
      ...rotation,
      next_rotation_at: updatedNextRotationAt,
      frequency,
    }

    // @ts-expect-error // TODO: fix ts error
    await database.putRotation(updatedRotation)

    console.log('UPDATED ROTATION', { updatedRotation })
    await acknowledge()
  } catch (e) {
    const error = e as Error
    console.log(UNEXPECTED_ERROR, { error })
  }
})

export const handler = awsLambdaReceiver.toHandler()
