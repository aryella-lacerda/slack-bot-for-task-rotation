import { App } from "@slack/bolt";
import * as utils from "../utils";
import * as database from "../database";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

export const handler = async () => {
  await app.start(process.env.PORT || 3000);

  app.command("/rotate", async ({ payload, ack, say }) => {
    try {
      const users = utils.extractUsers(payload.text);
      const task = utils.extractTask(payload.text);

      if (!users || !task) {
        return await ack({
          response_type: "ephemeral",
          text: "Invalid command parameters. Please use template: /rotate a list of users for a task. Example: '/rotate @user1, @user2, and @user3 for daily meeting host'.",
        });
      }

      await database.putRotation({
        task,
        user_list: users,
        next_user: users[0],
        channel_id: payload.channel_id,
      });

      await ack();

      const usersMentions = utils.formatUserMentions(users);
      await say(
        `set up a daily rotation for ${task}, containing: ${usersMentions}`
      );
    } catch (err) {
      await ack({
        response_type: "ephemeral",
        text: "An error occurred. Please try again.",
      });
    }
  });
};
