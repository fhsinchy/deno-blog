import client from "../db/mysql.ts";

try {
  await client.execute(`
        DROP TABLE IF EXISTS users
    `);

  await client.execute(`
    DROP TABLE IF EXISTS blogs
    `);
} catch (err) {
  console.error(err);
}
