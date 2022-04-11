import { getDynamoDBClient } from "./get-dynamodb-client";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Rotation } from "../entities/rotation";

const dynamodb = getDynamoDBClient();

export const MISSING_GET_BY_TASK_PARAMS =
  "Rotation task required for GET rotation operation";

type ByTask = {
  task: string;
  channel_id: string;
};

export const getRotationByTask = async ({ task, channel_id }: ByTask) => {
  if (!task || !channel_id) {
    throw new Error(MISSING_GET_BY_TASK_PARAMS);
  }

  const response = await dynamodb.send(
    new QueryCommand({
      // ProjectionExpression: 'PK',
      TableName: process.env.ROTATIONS_TABLE,
      IndexName: "ByChannelId",
      KeyConditionExpression: "channel_id = :channelID AND task = :task",
      // FilterExpression: "task = :task",
      ExpressionAttributeValues: {
        ":channelID": channel_id,
        ":task": task,
      },
    })
  );

  return response?.Items?.[0] as Rotation;
};
