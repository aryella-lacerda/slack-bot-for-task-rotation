import { Rotation } from "../entities/rotation";
import { formatUserMentions } from "./format-user-mentions";

export const formatRotationsList = (rotations: Rotation[]) => {
  const header = `This channel contains *${rotations.length} rotations*.\n`;

  const rotationDescriptions = rotations.map((rotation) => {
    const allUsers = formatUserMentions(rotation.user_list);
    const nextUser = formatUserMentions([rotation.next_user]);
    return `>- a daily rotation for *${rotation.task}*, containing ${allUsers}. The next one up is ${nextUser}.`;
  });

  const footer = `\n_You can create another rotation using the /rotate command or delete an existing rotation using the /delete-rotation command_`;

  return [header, ...rotationDescriptions, footer].join("\n");
};
