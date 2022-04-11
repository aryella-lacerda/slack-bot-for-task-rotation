import { GetCommand } from "@aws-sdk/lib-dynamodb";
import {
  getRotationByTask,
  MISSING_GET_BY_TASK_PARAMS,
} from "./get-rotation-by-task";
import { getDynamoDBClient } from "./get-dynamodb-client";
import seeds from "../seed/rotations.json";

const ddb = getDynamoDBClient();

it("should throw an error if not passed a rotation task", async () => {
  const rotationToGet = {
    channel_id: "channel_id",
  };

  // @ts-expect-error
  await expect(getRotationByTask(rotationToGet)).rejects.toThrow(
    MISSING_GET_BY_TASK_PARAMS
  );
});

it("should throw an error if not passed a channel id", async () => {
  const rotationToGet = {
    task: "task",
  };

  // @ts-expect-error
  await expect(getRotationByTask(rotationToGet)).rejects.toThrow(
    MISSING_GET_BY_TASK_PARAMS
  );
});

it("should return undefined given an invalid rotation task", async () => {
  // Arrange
  // --> DB gets seeded in the jest.setup.ts file
  const rotationToGet = {
    channel_id: seeds[0].channel_id,
    task: "task does not exist",
  };

  // Act
  const rotation = await getRotationByTask(rotationToGet);

  // Assert
  expect(rotation).toBeUndefined();
});

it("should return undefined given an invalid channel id", async () => {
  // Arrange
  // --> DB gets seeded in the jest.setup.ts file
  const rotationToGet = {
    channel_id: "channel does not exist",
    task: seeds[0].task,
  };

  // Act
  const rotation = await getRotationByTask(rotationToGet);

  // Assert
  expect(rotation).toBeUndefined();
});

it("should return a rotation given a valid rotation task", async () => {
  // Arrange
  // --> DB gets seeded in the jest.setup.ts file
  const rotationToGet = {
    channel_id: seeds[0].channel_id,
    task: seeds[0].task,
  };

  // Act
  const rotation = await getRotationByTask(rotationToGet);

  // Assert
  expect(rotation).toEqual(seeds[0]);
});
