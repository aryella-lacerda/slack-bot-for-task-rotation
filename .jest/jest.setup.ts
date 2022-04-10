import {
  getDynamoDB,
  getDynamoDBClient,
} from "../database/get-dynamodb-client";
import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import rotations from "../seed/rotations.json";
import { getDynamoDBTables } from "./get-dynamodb-tables";

const dynamoDB = getDynamoDB();
const client = getDynamoDBClient();

async function createTables() {
  const tables = await getDynamoDBTables();
  return Promise.all(tables.map((table) => dynamoDB.createTable(table)));
}

async function deleteTables() {
  const tables = await getDynamoDBTables();
  return Promise.all(
    tables.map((table) => dynamoDB.deleteTable({ TableName: table.TableName }))
  );
}

async function seedTables() {
  const items = rotations.map((rotation) => ({
    PutRequest: {
      Item: rotation,
    },
  }));

  return Promise.all([
    client.send(
      new BatchWriteCommand({
        RequestItems: {
          "rotations-development": items,
        },
      })
    ),
  ]);
}

beforeEach(async () => {
  await deleteTables();
  await createTables();
  await seedTables();
});
