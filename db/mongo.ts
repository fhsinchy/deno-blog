import { MongoClient } from "../deps.ts";
import env from "../config/env.ts";

const client = new MongoClient();
client.connectWithUri(env["MONGO_URL"]);

const db = client.database(env["DB_DATABASE"]);

export default db;
