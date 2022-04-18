import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const isTest = process.env.JEST_WORKER_ID
const isOffline = process.env.IS_OFFLINE === 'true'

const devOptions = {
  region: 'local-env',
  sslEnabled: false,
  endpoint: `http://localhost:${isTest ? 8000 : 8001}`,
  credentials: {
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET',
  },
}

const prodOptions = {
  region: 'us-east-1',
}

const options = isTest || isOffline ? devOptions : prodOptions

const dynamodb = new DynamoDB(options)
const dynamodbClient = new DynamoDBClient(options)
const documentDocumentClient = DynamoDBDocumentClient.from(dynamodbClient, {
  marshallOptions: {
    convertEmptyValues: true,
  },
})

export const getDynamoDBClient = () => documentDocumentClient
export const getDynamoDB = () => dynamodb
