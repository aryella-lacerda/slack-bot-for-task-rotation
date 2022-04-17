import { RotationFrequency } from '@constants'

type ValueOf<T> = T[keyof T]

export type Rotation = {
  id: string
  created_at: string
  next_rotation_at: string
  task: string
  user_list: string[]
  channel_id: string
  next_user: string
  frequency: ValueOf<typeof RotationFrequency>
}
