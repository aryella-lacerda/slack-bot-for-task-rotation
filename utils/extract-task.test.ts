import { extractTask } from "./extract-task";

it("should return a string with the matched task", () => {
  const command = "Rotate a long list of users for meeting host";
  expect(extractTask(command)).toBe("meeting host");
});

it("should return undefined if a task is not found", () => {
  const command = "Rotate a long list of users without any task";
  expect(extractTask(command)).toBeUndefined();
});
