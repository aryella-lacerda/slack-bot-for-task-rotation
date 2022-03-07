import * as database from "../database";

import { Rotation } from "../entities/rotation";
import { App } from "@slack/bolt";

import { UNEXPECTED_ERROR } from "./user-messages";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

export const handler = async () => {
  console.log(`TABLE: ${process.env.ROTATIONS_TABLE}`);
  const rotations = (await database.getAllRotations()) as Rotation[];

  for (let rotation of rotations) {
    try {
      const currentUser = rotation.next_user;
      const currentUserIndex = rotation.user_list.indexOf(currentUser);
      const nextUserIndex = (currentUserIndex + 1) % rotation.user_list.length;

      console.log("CURRENT AND NEXT USERS", {
        userList: rotation.user_list,
        currentUser,
        currentUserIndex,
        nextUserIndex,
      });

      await app.client.chat.postMessage({
        channel: rotation.channel_id,
        text: `<${currentUser}>, you're up for ${rotation.task}!`,
      });

      console.log("NOTIFICATION POSTED");

      await database.putRotation({
        ...rotation,
        next_user: rotation.user_list[nextUserIndex],
      });

      console.log("ROTATION ITEM UPDATED");
    } catch (err) {
      console.error(UNEXPECTED_ERROR, { err });
    }
  }
};
