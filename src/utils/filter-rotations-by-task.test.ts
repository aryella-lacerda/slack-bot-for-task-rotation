import { RotationFrequency } from '@constants'

import { filterRotationsByTask } from './filter-rotations-by-task'

const rotations = [
  {
    id: '03ce1f90-5a9c-4658-8a53-8e4a4892896f',
    created_at: '2022-03-30T11:22:06.082Z',
    next_rotation_at: '2022-04-30T11:22:06.082Z',
    task: 'daily meeting host',
    user_list: ['@U02AMETS1UG', '@U01G65M5LQ4', '@U02FVLR9AE9'],
    channel_id: 'C0339UGLTHS',
    next_user: '@U02AMETS1UG',
    frequency: RotationFrequency.EVERY_DAY,
  },
  {
    id: 'a5aa1829-98f2-495f-830c-0aec046ad468',
    created_at: '2022-03-30T11:22:07.082Z',
    next_rotation_at: '2022-04-30T11:22:06.082Z',
    task: 'soccer captain',
    user_list: ['@U02PD4Y3ACR', '@U02AMETS1UG'],
    channel_id: 'C0339UGLTHS',
    next_user: '@U02PD4Y3ACR',
    frequency: RotationFrequency.EVERY_DAY,
  },
  {
    id: '03ce1f90-5a9c-1234-567a-8e4a4892896f',
    created_at: '2022-03-30T11:22:08.082Z',
    next_rotation_at: '2022-04-30T11:22:06.082Z',
    task: 'playing video games',
    user_list: ['@U02PD4Y3ACR', '@U02AMETS1UG'],
    channel_id: 'C0123ABCDEF',
    next_user: '@U02PD4Y3ACR',
    frequency: RotationFrequency.EVERY_DAY,
  },
]

it('should return rotation if the rotation for a given task exists', () => {
  const task = rotations[2].task
  expect(filterRotationsByTask(rotations, task)).toStrictEqual(rotations[2])
})

it('should return undefined if the rotation for a given task does not exist', () => {
  const task = 'a task that does not exist'
  expect(filterRotationsByTask(rotations, task)).toBeUndefined()
})
