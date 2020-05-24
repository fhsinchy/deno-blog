import { Client } from 'https://deno.land/x/mysql/mod.ts';

const client = await new Client().connect({
    hostname: '192.168.10.10',
    port: 3306,
    username: 'homestead',
    password: 'secret',
    db: 'deno-blog'
  });

export default client;
