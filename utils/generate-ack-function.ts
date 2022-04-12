export const generateAckFunction = (ack: Function) => (msg?: string) =>
  ack(
    msg
      ? {
          response_type: 'ephemeral',
          text: msg,
        }
      : undefined
  )
