import { RotationFrequency } from '@constants'

import { Rotation } from '@entities'

import { advanceUserListByOne } from './advance-user-list-by-one'

it('should calculate the next user given a rotation with an odd number of users', () => {
  const rotation: Rotation = {
    id: 'id',
    created_at: 'created_at',
    next_rotation_at: 'next_rotation_at',
    task: 'task',
    user_list: ['@userA', '@userB', '@userC'],
    channel_id: 'channel_id',
    next_user: '@userC',
    frequency: RotationFrequency.EVERY_DAY,
  }

  expect(advanceUserListByOne(rotation)).toBe('@userA')
})

it('should calculate the next user given a rotation with an even number of users', () => {
  const rotation: Rotation = {
    id: 'id',
    created_at: 'created_at',
    next_rotation_at: 'next_rotation_at',
    task: 'task',
    user_list: ['@userA', '@userB'],
    channel_id: 'channel_id',
    next_user: '@userA',
    frequency: RotationFrequency.EVERY_DAY,
  }

  expect(advanceUserListByOne(rotation)).toBe('@userB')
})
