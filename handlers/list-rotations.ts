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

    const header = `This channel contains *${rotations.length} rotations*.\n`;

    console.log(header, channelID);

    const rotationDescriptions = rotations.map((rotation) => {
      const allUsers = utils.formatUserMentions(rotation.user_list);
      const nextUser = utils.formatUserMentions([rotation.next_user]);
      return `>- a daily rotation for *${rotation.task}*, containing ${allUsers}. The next one up is ${nextUser}.`;
    });

    const footer = `\n_You can create another rotation using the /rotate command or delete an existing rotation using the /delete-rotation command_`;

    const userResponse = [header, ...rotationDescriptions, footer].join("\n");

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
