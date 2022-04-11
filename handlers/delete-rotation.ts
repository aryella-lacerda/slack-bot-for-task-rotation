import { App, AwsLambdaReceiver } from "@slack/bolt";
import * as utils from "../utils";
import * as database from "../database";

import { UNEXPECTED_ERROR, UNEXPECTED_ERROR_ADVICE } from "./user-messages";

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
    const channel_id = payload.channel_id;
    const task = utils.extractTask(payload.text);

    const toDelete = {
      task,
      channel_id,
    };

    console.log("DELETE ROTATION", toDelete);

    const rotation = await database.getRotationByTask(toDelete);

    await database.deleteRotation({
      id: rotation.id,
      next_rotation_at: rotation.next_rotation_at,
    });

    await respond(`Rotation for ${task} deleted successfully`); // visible only to user
    return acknowledge();
  } catch (err) {
    console.error(UNEXPECTED_ERROR, { err });
    return acknowledge(UNEXPECTED_ERROR_ADVICE);
  }
});

export const handler = awsLambdaReceiver.toHandler();
