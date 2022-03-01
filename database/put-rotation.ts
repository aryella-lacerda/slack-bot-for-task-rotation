import dayjs from "dayjs";
import AWS, { DynamoDB } from "aws-sdk";
import { v4 as uuid } from "uuid";
import { Rotation } from "../entities/rotation";

AWS.config.update({ region: "us-east-1" });
const dynamodb = new DynamoDB.DocumentClient();

export const putRotation = async (
  rotation: Pick<Rotation, "task" | "user_list" | "channel_id" | "next_user">
) => {
  const item = {
    TableName: process.env.ROTATIONS_TABLE,
    Item: {
      id: uuid(),
      created_at: dayjs().toISOString(),
      next_rotation_at: dayjs().add(1, "day").toISOString(),
      task: rotation.task,
      user_list: rotation.user_list,
      channel_id: rotation.channel_id,
      next_user: rotation.next_user,
    },
  };

  return dynamodb.put(item).promise();
};
