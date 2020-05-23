import { Status } from 'https://deno.land/x/oak/mod.ts';
import { validateJwt } from 'https://deno.land/x/djwt/validate.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const env = config();

export default async (ctx: any, next: any) => {
    const authHeader = ctx.request.headers.get('authorization');

    if (!authHeader) {
        ctx.throw(Status.Unauthorized);
    } else {
        const token = authHeader.split(' ')[1];

        try {
            const { payload }: any = await validateJwt(token, env['TOKEN_SECRET']);

            ctx.request.user = payload;

            next();
        } catch(err) {
            ctx.throw(Status.Unauthorized);
        }
    }
}