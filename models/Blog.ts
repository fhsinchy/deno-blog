import { slugify } from "https://deno.land/x/slugify/mod.ts";

import client from '../db/mysql.ts';

const tableName = 'blogs';

class Blog {
    public id: number;
    public title: string;
    public slug: string;
    public content: string;
    public createdAt: string;

    constructor(id: number, title: string, slug: string, content: string, createdAt: string) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.createdAt = createdAt;
    }

    static async all() {
        return (await client.execute('SELECT * FROM ??', [tableName])).rows;
    }

    static async create(params: any) {
        const title = params.title;
        const slug = slugify(params.title, { lower: true });
        const content = params.content;

        const result = await client.execute('INSERT INTO ?? (title, slug, content) VALUES (?, ?, ?)', [tableName, title, slug, content]);
        
        return { blogId: result.lastInsertId, blogCount: result.affectedRows };
    }

    static async findBySlug(slug: string) {
        const result = await client.execute('SELECT * FROM ?? WHERE slug = ?', [tableName, slug]);
        const rows = result.rows;
        
        return rows ? new this(rows[0].id, rows[0].title, rows[0].slug, rows[0].content, rows[0].created_at) : null;
    }

    async save() {
        await client.execute('UPDATE ?? SET title = ?, content = ? WHERE slug = ?', [tableName, this.title, this.content, this.slug]);
    }

    async delete() {
        await client.execute('DELETE FROM ?? WHERE slug = ?', [tableName, this.slug]);
    }
}

export default Blog;
