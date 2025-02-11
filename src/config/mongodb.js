const MONGODB_URL =
  "mongodb+srv://thaiduytien:16112004@cluster0.2c2os.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DATABASE_NAME = "trello-duytien-mernstack";

const { MongoClient, ServerApiVersion } = require("mongodb");

let trelloDatabaseInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  autoSelectFamily: false,
});

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect();
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first");
  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
