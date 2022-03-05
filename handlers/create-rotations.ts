import { App } from "@slack/bolt";
import * as utils from "../utils";
import * as database from "../database";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

export const handler = async () => {
  console.log("SLACK APP START");
  await app.start(process.env.PORT || 3000);

  app.command("/rotate", async ({ payload, ack, say, respond }) => {
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
      await say(
        `set up a daily rotation for ${task}, containing: ${usersMentions}`
      );
    } catch (err) {
      console.error("UNEXPECTED ERROR", { err });

      await ack({
        response_type: "ephemeral",
        text: "An error occurred. Please try again.",
      });
    }
  });
};
