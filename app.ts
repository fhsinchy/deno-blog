import app from "./api/server.ts";

import home from "./routes/home.ts";
import blogs from "./routes/blogs.ts";
import auth from "./routes/auth.ts";

const port = 3000;

app.use(home.routes())
  .use(blogs.routes())
  .use(auth.routes());

console.log(`app running -> http://127.0.0.1:${port}`);
await app.listen({ port });
