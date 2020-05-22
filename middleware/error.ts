import { isHttpError, Status } from "https://deno.land/x/oak/mod.ts";

export default async (ctx: any, next: any) => {
    try {
      await next()
    } catch (err) {
      if(isHttpError(err)) {
        switch (err.status) {
          case Status.InternalServerError:
            ctx.response.status = err.status;
            ctx.response.type = 'json';
            ctx.response.body = {
                status: 'error',
                message: err.message,
            }
            break;
          default:
            break;
        }
      }
    }
  }