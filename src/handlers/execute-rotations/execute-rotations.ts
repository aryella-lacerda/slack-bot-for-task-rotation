import * as database from '@database'
import { startSlackApp } from '@handlers/start-slack-app'
import { UNEXPECTED_ERROR } from '@handlers/user-messages'
import * as utils from '@utils'

const { app } = startSlackApp()

export const handler = async () => {
  if (process.env.IS_OFFLINE) {
    // @ts-expect-error //TODO: Add mock server later
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    app.client.chat.postMessage = async () => {}
  }

  const rotations = await database.getAllRotations()

  for (const rotation of rotations) {
    try {
      await app.client.chat.postMessage({
        channel: rotation.channel_id,
        text: `<${rotation.next_user}>, you're up for ${rotation.task}!`,
      })

      await database.putRotation({
        ...rotation,
        next_user: utils.advanceUserListByOne(rotation),
      })
    } catch (e) {
      const error = e as Error
      console.error(UNEXPECTED_ERROR, { error })
    }
  }
}
