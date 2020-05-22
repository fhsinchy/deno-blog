import { Router, Status } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get('/', ({ response }: { response: any }) => {
    response.status = Status.OK;
    response.type = 'json';
    response.body = {
        message: 'Bonjour mon ami'
    }
});

export default router;
