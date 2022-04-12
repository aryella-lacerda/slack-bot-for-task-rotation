module.exports = async () => {
  const { getDynamoDBTables } = require('./.jest/get-dynamodb-tables')
  const tables = await getDynamoDBTables()

  return {
    tables,
    port: 8000,
    options: ['-sharedDb']
  }
}
