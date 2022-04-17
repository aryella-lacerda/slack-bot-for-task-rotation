// import dayjs from 'dayjs'

import { Rotation } from '@entities'
import * as utils from '@utils'

export const configureRotationBlocks = (rotation: Rotation) => {
  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `Configure rotation for ${rotation.task.toUpperCase()}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Setting up a rotation for some ${
          rotation.task
        } with ${utils.formatUserMentions(rotation.user_list)}`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Rotation frequency',
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'Every day',
              },
              value: '1',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Every other day',
              },
              value: '2',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Every week',
              },
              value: '7',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Every two weeks',
              },
              value: '14',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Every month',
              },
              value: '30',
            },
          ],
          action_id: `${rotation.id}-select-rotation-frequency`,
        },
        // {
        //   type: 'timepicker',
        //   initial_time: dayjs()
        //     .add(30, 'minutes')
        //     .startOf('hour')
        //     .format('HH:mm'), // rounds to the nearest hour
        //   placeholder: {
        //     type: 'plain_text',
        //     text: 'Select time',
        //   },
        //   action_id: `${rotation.id}-select-rotation-time`,
        // },
      ],
    },
  ]
}
