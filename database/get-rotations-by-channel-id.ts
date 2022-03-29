import AWS, { AWSError, DynamoDB } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { Rotation } from "../entities/rotation";

AWS.config.update({ region: "us-east-1" });
const dynamodb = new DynamoDB.DocumentClient();

export const getRotationsByChannelId = async (channelID: string) => {
  const response = await dynamodb
    .query({
      TableName: process.env.ROTATIONS_TABLE,
      IndexName: "ByChannelId",
      KeyConditionExpression: "channel_id = :documentNumber",
      // FilterExpression: "SK = :skValue",
      ExpressionAttributeValues: {
        ":channelID": channelID,
        // ":skValue": "HR-LEADER",
      },
    })
    .promise();

  return response.Items as Rotation[];
};
