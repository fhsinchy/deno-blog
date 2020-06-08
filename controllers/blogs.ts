import { Status } from "https://deno.land/x/oak/mod.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";

import client from "../db/mysql.ts";

export async function index(ctx: any) {
  const blogs: any = (await client.execute("SELECT * FROM blogs")).rows;

  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${blogs.length} blogs found in database`,
    data: { blogs },
  };
}

export async function store(ctx: any) {
  const body = await ctx.request.body();

  const title = body.value.title;
  const slug = slugify(body.value.title, { lower: true });
  const content = body.value.content;

  const result: any = await client.execute(
    "INSERT INTO blogs (title, slug, content) VALUES (?, ?, ?)",
    [title, slug, content],
  );

  ctx.response.status = Status.Created;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${result.affectedRows} blog created in database`,
    data: {
      blog: {
        id: result.lastInsertId,
      },
    },
  };
}

export async function show(ctx: any) {
  const result = await client.execute(
    "SELECT * FROM blogs WHERE slug = ?",
    [ctx.params.slug],
  );
  const rows: any = result.rows;

  if (rows.length > 0) {
    const blog: Blog = {
      id: rows[0].id,
      title: rows[0].title,
      content: rows[0].content,
      created_at: rows[0].created_at,
    };

    ctx.response.status = Status.OK;
    ctx.response.type = "json";
    ctx.response.body = {
      status: "success",
      message: `Blog with slug ${ctx.params.slug}`,
      data: { blog },
    };
  } else {
    ctx.throw(Status.NotFound);
  }
}

export async function update(ctx: any) {
  const result = await client.execute(
    "SELECT * FROM blogs WHERE slug = ?",
    [ctx.params.slug],
  );
  const rows: any = result.rows;

  if (rows.length > 0) {
    const blog = {
      id: rows[0].id,
      title: rows[0].title,
      content: rows[0].content,
      created_at: rows[0].created_at,
    };

    const body = await ctx.request.body();

    blog.title = body.value["title"] ? body.value["title"] : blog.title;
    blog.content = body.value["content"] ? body.value["content"] : blog.content;

    await client.execute(
      "UPDATE blogs SET title = ?, content = ? WHERE slug = ?",
      [blog.title, blog.content, ctx.params.slug],
    );

    ctx.response.status = Status.OK;
    ctx.response.type = "json";
    ctx.response.body = {
      status: "success",
      message: `Blog with slug ${ctx.params.slug} updated`,
      data: { blog },
    };
  } else {
    ctx.throw(Status.NotFound);
  }
}

export async function destroy(ctx: any) {
  const result = await client.execute(
    "SELECT * FROM blogs WHERE slug = ?",
    [ctx.params.slug],
  );
  const rows: any = result.rows;

  if (rows.length > 0) {
    await client.execute("DELETE FROM blogs WHERE slug = ?", [ctx.params.slug]);

    ctx.response.status = Status.OK;
    ctx.response.type = "json";
    ctx.response.body = {
      status: "success",
      message: `Blog with slug ${ctx.params.slug} deleted`,
      data: null,
    };
  } else {
    ctx.throw(Status.NotFound);
  }
}
