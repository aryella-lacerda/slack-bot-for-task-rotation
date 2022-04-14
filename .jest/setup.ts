import { getDynamoDB, getDynamoDBClient } from '../database/get-dynamodb-client'
import rotations from '../.seeds/rotations.json'

import {
  deleteTables,
  createTables,
  seedTables,
  getTablesFromServerless,
} from './utils'

const dynamodb = getDynamoDB()
const client = getDynamoDBClient()

beforeEach(async () => {
  const tables = await getTablesFromServerless()
  await deleteTables(dynamodb, tables)
  await createTables(dynamodb, tables)
  await seedTables(client, [
    {
      table: process.env.ROTATIONS_TABLE,
      items: rotations,
    },
  ])
})
