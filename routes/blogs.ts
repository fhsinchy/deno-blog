import { Router } from "https://deno.land/x/oak/mod.ts";

import { index, store, show, update, destroy } from '../controllers/blogs.ts';

const router = new Router();

router.get('/blogs', index)
      .post('/blogs', store)
      .get('/blogs/:slug', show)
      .put('/blogs/:slug', update)
      .delete('/blogs/:slug', destroy);

export default router;
