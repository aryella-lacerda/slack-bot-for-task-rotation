import * as utils from '../../utils'
import * as database from '../../database'
import { startSlackApp } from '../start-slack-app'

import {
  UNEXPECTED_ERROR,
  UNEXPECTED_ERROR_ADVICE,
  INVALID_PARAMS_ERROR,
  INVALID_PARAMS_ERROR_ADVICE,
  CHANNEL_NOT_FOUND_ERROR,
  CHANNEL_NOT_FOUND_ERROR_ADVICE,
  ROTATION_LOG,
} from '../user-messages'

const { app, awsLambdaReceiver } = startSlackApp()

app.command('/rotate', async ({ payload, ack, say, respond }) => {
  const acknowledge = utils.generateAckFunction(ack)

  try {
    const users = utils.extractUsers(payload.text)
    const task = utils.extractTask(payload.text)

    if (!users || !task) {
      console.error(INVALID_PARAMS_ERROR, { users, task })
      return acknowledge(INVALID_PARAMS_ERROR_ADVICE)
    }

    const rotation = {
      task,
      user_list: users,
      next_user: users[0],
      channel_id: payload.channel_id,
    }

    console.log(ROTATION_LOG, { rotation })
    await database.putRotation(rotation)

    const listOfUserMentions = utils.formatUserMentions(users)
    const userResponse = 'Rotation created! 🎉'
    const channelResponse = `set up a daily rotation for ${task}, containing: ${listOfUserMentions}`

    await respond(userResponse) // visible only to user
    await say(channelResponse) // visible to everyone in channel

    return acknowledge()
  } catch (err) {
    if (err?.message?.includes(CHANNEL_NOT_FOUND_ERROR)) {
      return acknowledge(CHANNEL_NOT_FOUND_ERROR_ADVICE)
    }

    console.error(UNEXPECTED_ERROR, { err })
    return acknowledge(UNEXPECTED_ERROR_ADVICE)
  }
})

export const handler = awsLambdaReceiver.toHandler()
