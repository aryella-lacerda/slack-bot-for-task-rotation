import { getDynamoDB } from '../src/database/get-dynamodb-client'
import { deleteTables, createTables, getTablesFromServerless } from './utils'

const dynamodb = getDynamoDB()

beforeEach(async () => {
  const tables = await getTablesFromServerless()
  await deleteTables(dynamodb, tables)
  await createTables(dynamodb, tables)
})
