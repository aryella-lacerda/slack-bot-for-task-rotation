import { formatRotationsList, FOOTER } from "./format-rotations-list";

const testRotations = [
  {
    id: "03ce1f90-5a9c-4658-8a53-8e4a4892896f",
    created_at: "2022-03-30T11:22:06.082Z",
    next_rotation_at: "2022-04-30T11:22:06.082Z",
    task: "daily meeting host",
    user_list: ["@U02AMETS1UG", "@U01G65M5LQ4", "@U02FVLR9AE9"],
    channel_id: "C0339UGLTHS",
    next_user: "@U02AMETS1UG",
  },
  {
    id: "a5aa1829-98f2-495f-830c-0aec046ad468",
    created_at: "2022-03-30T11:22:07.082Z",
    next_rotation_at: "2022-04-30T11:22:06.082Z",
    task: "soccer captain",
    user_list: ["@U02PD4Y3ACR", "@U02AMETS1UG"],
    channel_id: "C0339UGLTHS",
    next_user: "@U02PD4Y3ACR",
  },
  {
    id: "03ce1f90-5a9c-1234-567a-8e4a4892896f",
    created_at: "2022-03-30T11:22:08.082Z",
    next_rotation_at: "2022-04-30T11:22:06.082Z",
    task: "playing video games",
    user_list: ["@U02PD4Y3ACR", "@U02AMETS1UG"],
    channel_id: "C0123ABCDEF",
    next_user: "@U02PD4Y3ACR",
  },
];

it("should return only header and footer when passed no arguments", () => {
  const list = formatRotationsList();
  expect(list).toContain("This channel contains *0 rotations*.");
  expect(list).not.toContain(">-");
  expect(list).toContain(FOOTER);
});

it("should return only header and footer when there are no rotations", () => {
  const list = formatRotationsList([]);
  expect(list).toContain("This channel contains *0 rotations*.");
  expect(list).not.toContain(">-");
  expect(list).toContain(FOOTER);
});

it("should return header, footer, and list when there is one rotation", () => {
  const list = formatRotationsList([testRotations[0]]);
  expect(list).toContain("This channel contains *1 rotation*.");
  expect(list.match(/>-/g)).toHaveLength(1);
  expect(list).toContain(FOOTER);
});

it("should return header, footer, and list when there are more than one rotation", () => {
  const nRotations = testRotations.length;
  const list = formatRotationsList(testRotations);
  expect(list).toContain(`This channel contains *${nRotations} rotations*.`);
  expect(list.match(/>-/g)).toHaveLength(nRotations);
  expect(list).toContain(FOOTER);
});
