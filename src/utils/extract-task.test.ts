import { extractTask } from './extract-task'

it('should return a string with the matched task', () => {
  const command = '/create-rotation for meeting host with @user1, @user2'
  expect(extractTask(command)).toBe('meeting host')
})

it('should return a string with the matched task', () => {
  const command = '/create-rotation with @user1, @user2 for meeting host'
  expect(extractTask(command)).toBe('meeting host')
})

it('should return undefined if a task is not found', () => {
  const command = '/create-rotation with users but without any task'
  expect(extractTask(command)).toBeUndefined()
})
