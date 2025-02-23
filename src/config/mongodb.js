<<<<<<< HEAD
import { env } from "./environment";

const { MongoClient, ServerApiVersion } = require("mongodb");

let trelloDatabaseInstance = null;
=======
import { env } from './environment'

const { MongoClient, ServerApiVersion } = require('mongodb')

let trelloDatabaseInstance = null
>>>>>>> 7a8944e (update api column and card)

const mongoClientInstance = new MongoClient(env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
<<<<<<< HEAD
    deprecationErrors: true,
  },
  autoSelectFamily: false,
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first");
  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
=======
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
>>>>>>> 7a8944e (update api column and card)
