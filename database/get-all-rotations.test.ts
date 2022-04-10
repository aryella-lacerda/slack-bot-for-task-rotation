import { getDynamoDBClient } from "./get-dynamodb-client";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import rotations from "../seed/rotations.json";

const ddb = getDynamoDBClient();

it("should get all rotations in table", async () => {
  // Arrange
  // The table is seeded in the jest.setup.ts file

  //Act
  const { Items } = await ddb.send(
    new ScanCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Select: "ALL_ATTRIBUTES",
    })
  );

  // Assert
  expect(Items).toEqual(rotations);
});
