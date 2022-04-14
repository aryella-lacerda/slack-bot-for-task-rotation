import { AckFn } from '@slack/bolt'

export const generateAckFunction = (ack: AckFn<unknown>) => (msg?: string) =>
  ack(
    msg
      ? {
          response_type: 'ephemeral',
          text: msg,
        }
      : undefined
  )
