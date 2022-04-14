import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb'
import type { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import type { CreateTableInput, DynamoDB } from '@aws-sdk/client-dynamodb'
import YAML from 'js-yaml'
import fs from 'fs'

export const getTablesFromServerless = async (): Promise<
  Array<CreateTableInput>
> => {
  process.env.ROTATIONS_TABLE = 'rotations-development'

  const serverlessYML = fs.readFileSync('./serverless.yml', 'utf8')
  const serverlessJSON = YAML.load(serverlessYML)
  const resources = serverlessJSON.resources.Resources

  const rotationsTable = resources.RotationsTable.Properties
  rotationsTable.TableName = process.env.ROTATIONS_TABLE

  return [rotationsTable]
}

export async function createTables(
  dynamodb: DynamoDB,
  tables: CreateTableInput[]
) {
  return Promise.all(tables.map((table) => dynamodb.createTable(table)))
}

export async function deleteTables(
  dynamodb: DynamoDB,
  tables: CreateTableInput[]
) {
  return Promise.all(
    tables.map((table) => dynamodb.deleteTable({ TableName: table.TableName }))
  )
}

type Seed = {
  table: string
  items: unknown[]
}

export async function seedTables(
  client: DynamoDBDocumentClient,
  seeds: Seed[]
) {
  return Promise.all(
    seeds.map((seed) =>
      client.send(
        new BatchWriteCommand({
          RequestItems: {
            [seed.table]: seed.items.map((item) => ({
              PutRequest: {
                Item: item,
              },
            })),
          },
        })
      )
    )
  )
}
