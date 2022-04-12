import { getDynamoDBClient } from "../get-dynamodb-client";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Rotation } from "../../entities/rotation";

const dynamodb = getDynamoDBClient();

export const getAllRotations = async () => {
  const rotations = await dynamodb.send(
    new ScanCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Select: "ALL_ATTRIBUTES",
    })
  );

  return rotations.Items as Rotation[];
};
