import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const isTest = process.env.JEST_WORKER_ID;
const isOffline = process.env.IS_OFFLINE;

const devOptions = {
  region: "localhost",
  sslEnabled: false,
  endpoint: "http://localhost:8000",
  accessKeyId: "DEFAULT_ACCESS_KEY",
  secretAccessKey: "DEFAULT_SECRET",
  convertEmptyValues: true,
};

const options = {
  region: "us-east-1",
};

export const getDynamoDBClient = () =>
  new DynamoDBClient(isTest || isOffline ? devOptions : options);
