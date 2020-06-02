import { Client } from "../deps.ts";
import env from "../config/env.ts";

const client = await new Client().connect({
  hostname: env["DB_HOST"],
  port: parseInt(env["DB_PORT"]),
  username: env["DB_USERNAME"],
  password: env["DB_PASSWORD"],
  db: env["DB_DATABASE"],
});

export default client;
