import YAML from "js-yaml";
import fs from "fs";
import { CreateTableInput } from "@aws-sdk/client-dynamodb";

export const getDynamoDBTables = async (): Promise<Array<CreateTableInput>> => {
  process.env.ROTATIONS_TABLE = "rotations-development";

  const serverlessYML = fs.readFileSync("./serverless.yml", "utf8");
  const serverlessJSON = YAML.load(serverlessYML);
  const resources = serverlessJSON.resources.Resources;

  const rotationsTable = resources.RotationsTable.Properties;
  rotationsTable.TableName = process.env.ROTATIONS_TABLE;

  return [rotationsTable];
};
