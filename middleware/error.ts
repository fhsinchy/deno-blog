import { isHttpError, Status } from "https://deno.land/x/oak/mod.ts";
import between from '../helpers/between.ts';

export default async (ctx: any, next: any) => {
  try {
    await next()
  } catch (err) {
    if(isHttpError(err)) {
      const value = err.status;

      ctx.response.status = value;
      ctx.response.type = 'json';
      ctx.response.body = {
          status: between(value, 400, 500) ? 'fail' : 'error',
          message: err.message,
      }
    }
  }
}