import AWS, { DynamoDB } from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

const devOptions = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "DEFAULT_ACCESS_KEY",
  secretAccessKey: "DEFAULT_SECRET",
};

export const getDynamoDBClient = () =>
  new DynamoDB.DocumentClient(process.env.IS_OFFLINE ? devOptions : undefined);
