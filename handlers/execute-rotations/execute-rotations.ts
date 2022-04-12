import * as database from '../../database'
import { UNEXPECTED_ERROR } from '../user-messages'
import { startSlackApp } from '../start-slack-app'

const { app } = startSlackApp()

export const handler = async () => {
  if (process.env.IS_OFFLINE) {
    // @ts-expect-error //TODO: Add mock server later
    app.client.chat.postMessage = async () => {}
  }

  const rotations = await database.getAllRotations()

  for (let rotation of rotations) {
    try {
      const currentUser = rotation.next_user
      const currentUserIndex = rotation.user_list.indexOf(currentUser)
      const nextUserIndex = (currentUserIndex + 1) % rotation.user_list.length

      console.log('CURRENT AND NEXT USERS', {
        userList: rotation.user_list,
        currentUser,
        currentUserIndex,
        nextUserIndex,
      })

      await app.client.chat.postMessage({
        channel: rotation.channel_id,
        text: `<${currentUser}>, you're up for ${rotation.task}!`,
      })

      console.log('NOTIFICATION POSTED')

      await database.putRotation({
        ...rotation,
        next_user: rotation.user_list[nextUserIndex],
      })

      console.log('ROTATION ITEM UPDATED')
    } catch (err) {
      console.error(UNEXPECTED_ERROR, { err })
    }
  }
}
