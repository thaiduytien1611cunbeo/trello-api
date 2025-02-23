import { env } from './environment'

const { MongoClient, ServerApiVersion } = require('mongodb')

let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  },
  autoSelectFamily: false
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
