import { Rotation } from '@entities'

export const filterRotationsByTask = (rotations: Rotation[], task: string) => {
  return rotations.find(
    (rotation) => rotation.task.toLowerCase() === task.trim().toLowerCase()
  )
}
