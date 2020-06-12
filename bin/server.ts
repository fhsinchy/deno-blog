import app from "../app.ts";

const port = 3000;

console.log(`app running -> http://127.0.0.1:${port}`);
await app.listen({ port });