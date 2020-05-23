# Deno Blog

This is an experimental blogging API powered by [deno](https://deno.land/), [oak](https://github.com/oakserver/oak) and MySQL.

## Requirements

- Deno 1.0
- MySQL 5+

## Project Structure

```bash
.
├── README.md
├── api
│   └── server.ts
├── app.ts
├── controllers
│   ├── auth.ts
│   └── blogs.ts
├── db
│   └── mysql.ts
├── helpers
│   └── between.ts
├── makefile
├── middleware
│   ├── authorize.ts
│   ├── error.ts
│   ├── logger.ts
│   └── timer.ts
├── models
│   ├── Blog.ts
│   └── User.ts
└── routes
    ├── auth.ts
    ├── blogs.ts
    └── home.ts
```

> TODO: add project structure explanation.

## Instructions

Clone this repository anywhere you want. Make a copy of the `.env.example` file named `.env` and fill up the environment variables.

Create a new MySQL database and use following query to create the table:

```sql
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

Execute following command to run the application:

```bash
deno run --allow-net --allow-env --allow-read app.ts
```

There is also a makefile and following command can be used instead of the above one:

```bash
make run
```

> TODO: add detailed instructions.

## Development Task List

- Blogs :heavy_check_mark:
- Authentication :heavy_check_mark:
- Documentation :heavy_multiplication_x:
- Detailed Tutorial :heavy_multiplication_x:
