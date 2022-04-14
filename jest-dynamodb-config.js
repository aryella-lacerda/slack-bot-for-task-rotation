module.exports = async () => {
  const { getTablesFromServerless } = require('./.jest/utils')
  const tables = await getTablesFromServerless()

  return {
    tables,
    port: 8000,
    options: ['-sharedDb'],
  }
}
