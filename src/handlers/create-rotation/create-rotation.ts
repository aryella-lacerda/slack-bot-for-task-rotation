import * as database from '@database'
import { startSlackApp } from '@handlers/start-slack-app'
import {
  UNEXPECTED_ERROR,
  UNEXPECTED_ERROR_ADVICE,
  CREATE_ROTATION_INVALID_PARAMS_ERROR,
  CREATE_ROTATION_INVALID_PARAMS_ERROR_ADVICE,
  CHANNEL_NOT_FOUND_ERROR,
  CHANNEL_NOT_FOUND_ERROR_ADVICE,
  ROTATION_LOG,
} from '@handlers/user-messages'
import * as utils from '@utils'

import { configureRotationBlocks } from './configure-rotation-blocks'

const { app, awsLambdaReceiver } = startSlackApp()

//   text: 'for some task for <@U02AMETS1UG|aryella.lacerda> and <@U02PD4Y3ACR|felipe.augusto>',

app.command('/create-rotation', async ({ payload, ack, say, respond }) => {
  const acknowledge = utils.generateAckFunction(ack)

  try {
    console.log(payload)
    const users = utils.extractUsers(payload.text)
    const task = utils.extractTask(payload.text)

    if (!users || !task) {
      console.error(CREATE_ROTATION_INVALID_PARAMS_ERROR, { users, task })
      await acknowledge(CREATE_ROTATION_INVALID_PARAMS_ERROR_ADVICE)
      return
    }

    const rotation = await database.putRotation({
      task,
      user_list: users,
      next_user: users[0],
      channel_id: payload.channel_id,
    })

    console.log(ROTATION_LOG, { rotation })
    const listOfUserMentions = utils.formatUserMentions(users)
    // const userResponse = 'Rotation created! 🎉'
    const channelResponse = `<@${payload.user_id}> set up a rotation for *${task}* with ${listOfUserMentions}`

    await respond({
      blocks: configureRotationBlocks(rotation),
    }) // visible only to user

    await say(channelResponse) // visible to everyone in channel
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
