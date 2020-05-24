import { isHttpError, Status } from 'https://deno.land/x/oak/mod.ts';

export default async (ctx: any, next: any) => {
  try {
    await next();

    const status = ctx.response.status || Status.NotFound;

    if (status === Status.NotFound) {
        ctx.throw(Status.NotFound);
    }
  } catch (err) {
    if(isHttpError(err)) {
      const status = err.status;

      ctx.response.status = status;
      ctx.response.type = 'json';
      ctx.response.body = {
          status: status >= 400 && status < 500 ? 'fail' : 'error',
          message: err.message,
      };
    }
  }
}