import { Router } from "../deps.ts";

import authorize from "../middleware/authorize.ts";
import { index, store, show, update, destroy } from "../controllers/blogs.ts";

const router = new Router();

router.get("/blogs", index)
  .post("/blogs", authorize, store)
  .get("/blogs/:slug", show)
  .put("/blogs/:slug", authorize, update)
  .delete("/blogs/:slug", authorize, destroy);

export default router;
