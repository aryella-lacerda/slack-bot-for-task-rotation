import { getDynamoDBClient } from "./get-dynamodb-client";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Rotation } from "../entities/rotation";

const dynamodb = getDynamoDBClient();

export const getRotationsByChannelId = async (channelID: string) => {
  const response = await dynamodb.send(
    new QueryCommand({
      TableName: process.env.ROTATIONS_TABLE,
      IndexName: "ByChannelId",
      KeyConditionExpression: "channel_id = :channelID",
      ExpressionAttributeValues: {
        ":channelID": channelID,
      },
    })
  );

  return response.Items as Rotation[];
};
