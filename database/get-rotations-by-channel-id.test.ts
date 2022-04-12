import rotations from "../seed/rotations.json";
import { Rotation } from "../entities/rotation";
import { getRotationsByChannelId } from "./get-rotations-by-channel-id";
import dayjs from "dayjs";

const sortByDate = (a: Rotation, b: Rotation) =>
  dayjs(a.created_at).unix() - dayjs(b.created_at).unix();

it("should get all rotations linked to a channel id", async () => {
  // Arrange
  // The table is seeded in the jest.setup.ts file
  // The channel_id used here is defined in the seed file
  const channel_id = "C0339UGLTHS";
  const rotationsInChannel = (rotations as Rotation[]).filter(
    (rotation) => rotation.channel_id === channel_id
  );

  //Act
  const rotationsFound = await getRotationsByChannelId(channel_id);

  // Assert
  rotationsFound.sort(sortByDate);
  rotationsInChannel.sort(sortByDate);
  expect(rotationsFound).toEqual(rotationsInChannel);
});