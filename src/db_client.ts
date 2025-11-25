import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

/**
 * Initialise la connexion MongoDB si ce n'est pas déjà fait.
 */
export async function getMongoClient(): Promise<MongoClient> {
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  return client;
}

/**
 * Retourne l'instance de la base MongoDB.
 */
export async function getDatabase() {
  const client = await getMongoClient();
  const db = client.db(DB_NAME);
  return { client, db };
}
