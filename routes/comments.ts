import { Router } from "https://deno.land/x/oak/mod.ts";

import { index, store, destroy } from '../controllers/comments.ts';

const router = new Router();

router.get('/comments', index)
      .post('/comments', store)
      .delete('/comments/:id', destroy);

export default router;
