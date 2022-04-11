import { App, AwsLambdaReceiver } from "@slack/bolt";
import * as utils from "../utils";
import * as database from "../database";

import {
  UNEXPECTED_ERROR,
  UNEXPECTED_ERROR_ADVICE,
  CHANNEL_NOT_FOUND_ERROR,
  CHANNEL_NOT_FOUND_ERROR_ADVICE,
} from "./user-messages";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.command("/list-rotations", async ({ payload, ack, respond }) => {
  const acknowledge = utils.generateAckFunction(ack);

  try {
    const channelID = payload.channel_id;
    const rotations = await database.getRotationsByChannelId(channelID);
    const userResponse = utils.formatRotationsList(rotations);

    await respond(userResponse); // visible only to user

    return acknowledge();
  } catch (err) {
    if (err?.message?.includes(CHANNEL_NOT_FOUND_ERROR)) {
      return acknowledge(CHANNEL_NOT_FOUND_ERROR_ADVICE);
    }
    console.error(UNEXPECTED_ERROR, { err });
    return acknowledge(UNEXPECTED_ERROR_ADVICE);
  }
});

export const handler = awsLambdaReceiver.toHandler();
