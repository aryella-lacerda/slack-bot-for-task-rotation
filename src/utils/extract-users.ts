const userIdentifier = /@.?[^||>]*/gm

/**
 * @param command
 * @description Find an `@` and match everything until (but not including) the next `|` or `>` character.
 * @example extractUsers("<@U02AMETS1UG|user.a>") returns ["@U02AMETS1UG"]
 * @example extractUsers("<@user.a>") returns ["@user.a"]
 * @returns An array of matched identifiers, if found. Returns undefined otherwise.
 */
export const extractUsers = (command: string) => {
  return command.match(userIdentifier) ?? undefined
}
