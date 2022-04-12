export const formatUserMentions = (users: string[]) => {
  return users.map((user) => '<' + user + '>').join(', ')
}
