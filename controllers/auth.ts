import { Status, compare, hash, Header, create, Payload } from "../deps.ts";

import client from "../db/mysql.ts";

export async function register(ctx: any) {
  const body = await ctx.request.body();

  const name = body.value.name;
  const email = body.value.email;
  const password = await hash(body.value.password);

  const result = await client.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
  );

  ctx.response.status = Status.Created;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${result.affectedRows} user registered in database`,
    data: {
      todo: {
        id: result.lastInsertId,
      },
    },
  };
}

export async function login(ctx: any) {
  const body = await ctx.request.body();

  const result = await client.execute(
    "SELECT * FROM users WHERE email = ?",
    [body.value.email],
  );
  const rows: any = result.rows;

  let user: any;

  if (rows.length > 0) {
    const user = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      password: rows[0].password,
      created_at: rows[0].created_at,
    };

    if (await compare(body.value.password, user.password)) {
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
      ctx.throw(Status.Unauthorized);
    }
  } else {
    ctx.throw(Status.UnprocessableEntity);
  }
}
