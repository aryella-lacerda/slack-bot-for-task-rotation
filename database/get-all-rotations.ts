import AWS, { DynamoDB } from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

const dynamodb = new DynamoDB.DocumentClient();

export const getAllRotations = async () => {
  const rotations = await dynamodb
    .scan({
      TableName: process.env.ROTATIONS_TABLE,
      Select: "ALL_ATTRIBUTES",
    })
    .promise();

  return rotations.Items;
};
