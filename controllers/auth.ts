import { Status, compare, create, Header, Payload } from "../deps.ts";

import User from "../models/User.ts";

export async function register(ctx: any) {
  const body = await ctx.request.body();

  const user = await User.findByEmail(body.value.email);

  if (user) {
    ctx.throw(Status.Conflict, "Email Address Already Taken!");
  }

  const { userId, userCount } = await User.create(body.value);

  ctx.response.status = Status.Created;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${userCount} user registered in database`,
    data: {
      user: {
        id: userId,
      },
    },
  };
}

export async function login(ctx: any) {
  const body = await ctx.request.body();

  const user = await User.findByEmail(body.value.email);

  if (!user) {
    ctx.throw(Status.UnprocessableEntity, "Wrong Email Address!");
  } else if (await compare(body.value.password, user.password)) {
    const header: Header = { alg: "HS256", typ: "JWT" };
    const payload: Payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const key: string = Deno.env.get("TOKEN_SECRET") ||
      "secret";

    const token = create(header, payload, key);

    ctx.response.status = Status.OK;
    ctx.response.type = "json";
    ctx.response.body = {
      status: "success",
      message: `Logged in with ${body.value.email}`,
      data: { accessToken: token },
    };
  } else {
    ctx.throw(Status.Unauthorized, "Wrong Password!");
  }
}
