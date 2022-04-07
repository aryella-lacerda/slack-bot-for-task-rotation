import YAML from "yaml";
import fs from "fs";

const serverlessYML = fs.readFileSync("./serverless.yml", "utf8");
const serverlessJSON = YAML.parse(serverlessYML);

console.log(serverlessJSON);

module.exports = {
  tables: [serverlessJSON.resources.Resources.RotationsTable.Properties],
};
