import { App, AwsLambdaReceiver } from "@slack/bolt";
import * as utils from "../utils";
import * as database from "../database";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

app.command("/rotate", async ({ payload, ack, respond }) => {
  try {
    console.log("ROTATE COMMAND RECEIVED");

    const users = utils.extractUsers(payload.text);
    const task = utils.extractTask(payload.text);

    if (!users || !task) {
      console.error("INVALID PARAMS", { users, task });

      return await ack({
        response_type: "ephemeral",
        text: "Invalid command parameters. Please use template: /rotate a list of users for a task. Example: '/rotate @user1, @user2, and @user3 for daily meeting host'.",
      });
    }

    const rotation = {
      task,
      user_list: users,
      next_user: users[0],
      channel_id: payload.channel_id,
    };

    console.log("ROTATION", { rotation });
    await database.putRotation(rotation);

    await ack();

    const usersMentions = utils.formatUserMentions(users);
    await respond("Rotation created! 🎉");

    await app.client.chat.postMessage({
      channel: rotation.channel_id,
      text: `set up a daily rotation for ${task}, containing: ${usersMentions}`,
    });
  } catch (err) {
    console.error("UNEXPECTED ERROR", { err });

    await ack({
      response_type: "ephemeral",
      text: "An error occurred. Please try again.",
    });
  }
});

export const handler = awsLambdaReceiver.toHandler();
