import client from '../db/mysql.ts';

const tableName = 'comments';

class Blog {
    public id: number;
    public name: string;
    public content: string;
    public blogId: number;
    public createdAt: string;

    constructor(id: number, name: string, content: string, blogId: number, createdAt: string) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.blogId = blogId;
        this.createdAt = createdAt;
    }

    static async all() {
        return (await client.execute('SELECT * FROM ??', [tableName])).rows;
    }

    static async create(params: any) {
        const name = params.name;
        const content = params.content;
        const blogId = params.blog_id;

        const result = await client.execute('INSERT INTO ?? (name, content, blog_id) VALUES (?, ?, ?)', [tableName, name, content, blogId]);
        
        return { commentId: result.lastInsertId, commentCount: result.affectedRows };
    }

    static async findById(id: number) {
        const result = await client.execute('SELECT * FROM ?? WHERE id = ?', [tableName, id]);
        const rows = result.rows;
        
        return rows ? new this(rows[0].id, rows[0].name, rows[0].content, rows[0].blog_id, rows[0].created_at) : null;
    }

    async delete() {
        await client.execute('DELETE FROM ?? WHERE id = ?', [tableName, this.id]);
    }
}

export default Blog;
