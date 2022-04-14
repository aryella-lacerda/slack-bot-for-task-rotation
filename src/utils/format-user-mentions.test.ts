import { formatUserMentions } from './format-user-mentions'

it('should return a string with one user id formated for mentions', () => {
  expect(formatUserMentions(['@user.a'])).toBe('<@user.a>')
})

it('should return a string with user ids formated for mentions', () => {
  expect(formatUserMentions(['@user.a', '@user.b', '@user.c'])).toBe(
    '<@user.a>, <@user.b>, <@user.c>'
  )
})
