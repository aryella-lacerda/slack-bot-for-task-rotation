import * as database from "../database";

import { Rotation } from "../entities/rotation";
import { App } from "@slack/bolt";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

export const handler = async () => {
  const rotations = (await database.getAllRotations()) as Rotation[];

  rotations.forEach(async (rotation) => {
    try {
      const currentUser = rotation.next_user;
      const currentUserIndex = rotation.user_list.indexOf(currentUser);
      const nextUserIndex = (currentUserIndex + 1) % rotation.user_list.length;

      await app.client.chat.postMessage({
        channel: rotation.channel_id,
        text: `<${currentUser}>, you're up for ${rotation.task}!`,
      });

      await database.putRotation({
        ...rotation,
        next_user: rotation.user_list[nextUserIndex],
      });
    } catch (err) {}
  });
};
