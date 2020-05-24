import { Router } from "https://deno.land/x/oak/mod.ts";

import authorize from '../middleware/authorize.ts';
import { index, show, store, update, destroy } from '../controllers/blogs.ts';

const router = new Router();

router.get('/blogs', index)
      .post('/blogs', authorize, store)
      .get('/blogs/:slug', show)
      .put('/blogs/:slug', authorize, update)
      .delete('/blogs/:slug', authorize, destroy);

export default router;
