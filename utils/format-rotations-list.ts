import { Rotation } from '../entities/rotation'
import { formatUserMentions } from './format-user-mentions'

export const FOOTER = `\n_You can create another rotation using the /rotate command or delete an existing rotation using the /delete-rotation command_`

export const formatRotationsList = (rotations: Rotation[] = []) => {
  const _rotations = rotations.length === 1 ? 'rotation' : 'rotations'
  const HEADER = `This channel contains *${rotations.length} ${_rotations}*.\n`

  const rotationDescriptions = rotations.map((rotation) => {
    const allUsers = formatUserMentions(rotation.user_list)
    const nextUser = formatUserMentions([rotation.next_user])
    return `>- a daily rotation for *${rotation.task}*, containing ${allUsers}. The next one up is ${nextUser}.`
  })

  return [HEADER, ...rotationDescriptions, FOOTER].join('\n')
}
