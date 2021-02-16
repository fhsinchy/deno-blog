import { Application } from "./deps.ts";

import error from "./middleware/error.ts";
import logger from "./middleware/logger.ts";
import timer from "./middleware/timer.ts";

import home from "./routes/home.ts";
import blogs from "./routes/blogs.ts";
import auth from "./routes/auth.ts";

const app = new Application();
const port = 3000;

app.use(error);
app.use(logger);
app.use(timer);

app.use(home.routes())
  .use(blogs.routes())
  .use(auth.routes());

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

console.log(`app running -> http://127.0.0.1:${port}`);
await app.listen({ port });
