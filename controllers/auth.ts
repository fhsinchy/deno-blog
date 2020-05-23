import { Status } from 'https://deno.land/x/oak/mod.ts';
import { compare } from 'https://deno.land/x/bcrypt/mod.ts';
import { makeJwt } from 'https://deno.land/x/djwt/create.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import User from '../models/User.ts';

const env = config();

export async function register(ctx: any) {
    const body = await ctx.request.body();
    
    const { userId, userCount } = await User.create(body.value);

    ctx.response.status = Status.Created;
    ctx.response.type = 'json';
    ctx.response.body = {
        status: 'success',
        message: `${userCount} user registered in database`,
        data: {
            todo: {
                id: userId
            }
        }
    }
}

export async function login(ctx: any) {
    const body = await ctx.request.body();

    const user = await User.findByEmail(body.value.email);

    if (!user) {
        ctx.throw(Status.UnprocessableEntity);
    } else if (await compare(body.value.password, user.password)) {
        const token = makeJwt({ header: { alg: 'HS256', typ: 'JWT' }, payload: { id: user.id, name: user.name, email: user.email }, key: env['TOKEN_SECRET'] });

        console.log(token);

        ctx.response.status = Status.OK;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `Logged in with ${body.value.email}`,
            data: { accessToken: token },
        }   
    } else {
        ctx.throw(Status.Unauthorized);
    }
}