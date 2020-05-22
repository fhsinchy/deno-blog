import { Status } from "https://deno.land/x/oak/mod.ts";
import Comment from '../models/Comment.ts';

export async function index(ctx: any) {
    try {
        const comments = await Comment.all();
        
        ctx.response.status = Status.OK;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `${comments?.length} comments found in database`,
            data: { comments },
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}

export async function store(ctx: any) {
    const body = await ctx.request.body();
    
    try {
        const { commentId, commentCount } = await Comment.create(body.value);

        ctx.response.status = Status.Created;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `${commentCount} comments created in database`,
            data: {
                todo: {
                    id: commentId
                }
            }
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}

export async function destroy(ctx: any) {
    try {
        const comment = await Comment.findById(parseInt(ctx.params.id));

        if (comment) {
            comment.delete();
        }

        ctx.response.status = Status.OK;
        ctx.response.type = 'json';
        ctx.response.body = {
            status: 'success',
            message: `Comment with id ${ctx.params.id} deleted`,
            data: null,
        }
    } catch (err) {
        ctx.throw(Status.InternalServerError);
    }
}