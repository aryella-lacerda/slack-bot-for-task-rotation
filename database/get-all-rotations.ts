import { getDynamoDBClient } from "./get-dynamodb-client";

const dynamodb = getDynamoDBClient();

export const getAllRotations = async () => {
  const rotations = await dynamodb
    .scan({
      TableName: process.env.ROTATIONS_TABLE,
      Select: "ALL_ATTRIBUTES",
    })
    .promise();

  return rotations.Items;
};
