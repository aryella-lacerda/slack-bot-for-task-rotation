import { Rotation } from '@entities'

export const advanceUserListByOne = (rotation: Rotation) => {
  const currentUser = rotation.next_user
  const currentUserIndex = rotation.user_list.indexOf(currentUser)
  const nextUserIndex = (currentUserIndex + 1) % rotation.user_list.length
  return rotation.user_list[nextUserIndex]
}
