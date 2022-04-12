import { getDynamoDBClient } from "./get-dynamodb-client";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const dynamodb = getDynamoDBClient();

export const MISSING_DELETE_PARAMS =
  "Rotation id and next_rotation_at timestamp required for delete operation";

type RotationToDelete = {
  id: string;
  next_rotation_at: string;
};

export const deleteRotation = async ({
  id,
  next_rotation_at,
}: RotationToDelete) => {
  if (!id || !next_rotation_at) {
    throw new Error(MISSING_DELETE_PARAMS);
  }

  return dynamodb.send(
    new DeleteCommand({
      TableName: process.env.ROTATIONS_TABLE,
      Key: {
        id,
        next_rotation_at,
      },
    })
  );
};
