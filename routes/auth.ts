import { Router } from "https://deno.land/x/oak/mod.ts";

import { register, login } from "../controllers/auth.ts";

const router = new Router();

router.post("/auth/register", register)
  .post("/auth/login", login);

export default router;
