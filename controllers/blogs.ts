import { Status } from "https://deno.land/x/oak/mod.ts";
import Blog from '../models/Blog.ts';

export async function index(ctx: any) {
    try {
        const blogs = await Blog.all();
        
        ctx.response.status = Status.OK;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `${blogs?.length} blogs found in database`,
            data: { blogs },
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}

export async function store(ctx: any) {
    const body = await ctx.request.body();
    
    try {
        const { blogId, blogCount } = await Blog.create(body.value);

        ctx.response.status = Status.Created;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `${blogCount} blog created in database`,
            data: {
                todo: {
                    id: blogId
                }
            }
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}

export async function show(ctx: any) {
    try {
        const blog = await Blog.findBySlug(ctx.params.slug);

        ctx.response.status = Status.OK;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `Blog with slug ${ctx.params.slug}`,
            data: { blog },
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}

export async function update(ctx: any) {
    try {
        const blog = await Blog.findBySlug(ctx.params.slug);

        const body = await ctx.request.body();

        if (blog) {
            blog.title = body.value['title'] ? body.value['title'] : blog.title;
            blog.content = body.value['content'] ? body.value['content'] : blog.content;
            blog.save();
        }

        ctx.response.status = Status.OK;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `Blog with slug ${ctx.params.slug} updated`,
            data: { blog },
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}

export async function destroy(ctx: any) {
    try {
        const blog = await Blog.findBySlug(ctx.params.slug);

        if (blog) {
            blog.delete();
        }

        ctx.response.status = Status.OK;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `Blog with slug ${ctx.params.slug} deleted`,
            data: null,
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}