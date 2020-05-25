import { Client } from "https://deno.land/x/mysql/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

const client = await new Client().connect({
  hostname: env["DB_HOST"],
  port: parseInt(env["DB_PORT"]),
  username: env["DB_USERNAME"],
  password: env["DB_PASSWORD"],
  db: env["DB_DATABASE"],
});

export default client;
