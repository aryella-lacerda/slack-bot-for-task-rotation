import * as database from '@database'
import { startSlackApp } from '@handlers/start-slack-app'
import {
  UNEXPECTED_ERROR,
  UNEXPECTED_ERROR_ADVICE,
  ROTATION_NOT_FOUND,
  ROTATION_DELETED,
} from '@handlers/user-messages'
import * as utils from '@utils'

const { app, awsLambdaReceiver } = startSlackApp()

app.command('/delete-rotation', async ({ payload, ack, respond }) => {
  const acknowledge = utils.generateAckFunction(ack)

  try {
    const channelID = payload.channel_id
    const task = utils.extractTask(payload.text)

    const rotationsInChannel = await database.getRotationsByChannelId(channelID)

    const rotationToDelete = rotationsInChannel.find(
      (rotation) => rotation.task.toLowerCase() === task.toLowerCase()
    )

    if (!rotationToDelete) {
      console.log(ROTATION_NOT_FOUND, channelID, task)

      await respond(
        `Rotation for *${task}* not found. ` +
          utils.formatRotationsList(rotationsInChannel)
      ) // visible only to user

      await acknowledge()
      return
    }

    await database.deleteRotation({
      id: rotationToDelete.id,
      next_rotation_at: rotationToDelete.next_rotation_at,
    })

    console.log(ROTATION_DELETED, rotationToDelete)

    await respond(`Rotation for *${task}* deleted successfully`) // visible only to user
    await acknowledge()
    return
  } catch (e) {
    const error = e as Error
    console.error(UNEXPECTED_ERROR, { error })
    await acknowledge(UNEXPECTED_ERROR_ADVICE)
  }
})

export const handler = awsLambdaReceiver.toHandler()
