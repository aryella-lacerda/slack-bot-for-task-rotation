import { getDynamoDBClient } from "./get-dynamodb-client";
const ddb = getDynamoDBClient();

it("should insert item into table", async () => {
  await ddb
    .put({ TableName: "files", Item: { id: "1", hello: "world" } })
    .promise();

  const { Item } = await ddb
    .get({ TableName: "files", Key: { id: "1" } })
    .promise();

  expect(Item).toEqual({
    id: "1",
    hello: "world",
  });
});
