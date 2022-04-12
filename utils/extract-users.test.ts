import { extractUsers } from './extract-users'

it('should return an array of users given a string with escaped identifiers', () => {
  const command =
    '<@U02AMETS1UG|user.a>, <@U01G65M5LQ4|user.b>, <@U02PD4Y3ACR|user.c> for meeting host'

  expect(extractUsers(command)).toEqual([
    '@U02AMETS1UG',
    '@U01G65M5LQ4',
    '@U02PD4Y3ACR',
  ])
})

it('should return an array of users given a string with non-escaped identifiers', () => {
  const command = '<@user.a>, <@user.b>, <@user.c> for meeting host'

  expect(extractUsers(command)).toEqual(['@user.a', '@user.b', '@user.c'])
})

it('should return undefined for strings without identifiers', () => {
  const command = 'someone random for meeting host'

  expect(extractUsers(command)).toBeUndefined()
})
