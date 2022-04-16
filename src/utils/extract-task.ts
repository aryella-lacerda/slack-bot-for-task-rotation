const userIdentifier = /(?<=for).*?(?=with|$)/gm

/**
 * @param command
 * @description Find the word `for` and match everything until the word `with` or the end of the sentence.
 * @example extractUsers("<@U02AMETS1UG|user.a> for meeting host") returns "meeting host"
 * @returns A string containing the matched task, if found. Returns undefined otherwise.
 */
export const extractTask = (command: string) => {
  return command.match(userIdentifier)?.[0].trim()
}
