import { App, AwsLambdaReceiver } from "@slack/bolt";
import * as utils from "../utils";
import * as database from "../database";

import {
  UNEXPECTED_ERROR,
  UNEXPECTED_ERROR_ADVICE,
  ROTATION_NOT_FOUND,
  ROTATION_DELETED,
} from "./user-messages";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.command("/delete-rotation", async ({ payload, ack, respond }) => {
  const acknowledge = utils.generateAckFunction(ack);

  try {
    const channelID = payload.channel_id;
    const task = utils.extractTask(payload.text);

    const rotationsInChannel = await database.getRotationsByChannelId(
      channelID
    );

    const rotationToDelete = rotationsInChannel.find(
      (rotation) => rotation.task.toLowerCase() === task.toLowerCase()
    );

    if (!rotationToDelete) {
      console.log(ROTATION_NOT_FOUND, channelID, task);

      await respond(
        `Rotation for *${task}* not found. ` +
          utils.formatRotationsList(rotationsInChannel)
      ); // visible only to user

      return acknowledge();
    }

    await database.deleteRotation({
      id: rotationToDelete.id,
      next_rotation_at: rotationToDelete.next_rotation_at,
    });

    console.log(ROTATION_DELETED, rotationToDelete);

    await respond(`Rotation for *${task}* deleted successfully`); // visible only to user
    return acknowledge();
  } catch (err) {
    console.error(UNEXPECTED_ERROR, { err });
    return acknowledge(UNEXPECTED_ERROR_ADVICE);
  }
});

export const handler = awsLambdaReceiver.toHandler();
