import * as database from '@database'
import { startSlackApp } from '@handlers/start-slack-app'
import {
  UNEXPECTED_ERROR,
  UNEXPECTED_ERROR_ADVICE,
  ROTATE_INVALID_PARAMS_ERROR,
  ROTATE_INVALID_PARAMS_ERROR_ADVICE,
  CHANNEL_NOT_FOUND_ERROR,
  CHANNEL_NOT_FOUND_ERROR_ADVICE,
  ROTATION_NOT_FOUND,
  ROTATION_LOG,
} from '@handlers/user-messages'
import * as utils from '@utils'

const { app, awsLambdaReceiver } = startSlackApp()

app.command('/rotate', async ({ payload, ack, say, respond }) => {
  const acknowledge = utils.generateAckFunction(ack)

  try {
    const { channel_id: channelID, text: task, user_id: userID } = payload

    if (!task) {
      console.error(ROTATE_INVALID_PARAMS_ERROR, { task })
      await acknowledge(ROTATE_INVALID_PARAMS_ERROR_ADVICE)
      return
    }

    const rotationsInChannel = await database.getRotationsByChannelId(channelID)
    const rotation = utils.filterRotationsByTask(rotationsInChannel, task)

    if (!rotation) {
      console.log(ROTATION_NOT_FOUND, channelID, task)
      await respond(
        `Rotation for *${task}* not found. ` +
          utils.formatRotationsList(rotationsInChannel)
      ) // visible only to user

      await acknowledge()
      return
    }

    const updatedRotation = {
      ...rotation,
      next_user: utils.advanceUserListByOne(rotation),
    }

    await database.putRotation(updatedRotation)
    await say(
      `<@${userID}> manually advanced the rotation for *${rotation.task}*. <${updatedRotation.next_user}>, you're up next!`
    )

    console.log(ROTATION_LOG, { updatedRotation })
    await acknowledge()
    return
  } catch (e) {
    const error = e as Error

    if (error?.message?.includes(CHANNEL_NOT_FOUND_ERROR)) {
      await acknowledge(CHANNEL_NOT_FOUND_ERROR_ADVICE)
      return
    }

    console.error(UNEXPECTED_ERROR, { error })
    await acknowledge(UNEXPECTED_ERROR_ADVICE)
  }
})

export const handler = awsLambdaReceiver.toHandler()
