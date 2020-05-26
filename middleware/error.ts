import { isHttpError, Status } from "../deps.ts";

import between from "../helpers/between.ts";

export default async (ctx: any, next: any) => {
  try {
    await next();

    const status = ctx.response.status || Status.NotFound;

    if (status === Status.NotFound) {
      ctx.throw(Status.NotFound);
    }
  } catch (err) {
    if (isHttpError(err)) {
      const status = err.status;

      ctx.response.status = status;
      ctx.response.type = "json";
      ctx.response.body = {
        status: between(status, 400, 500) ? "fail" : "error",
        message: err.message,
      };
    }
  }
};
