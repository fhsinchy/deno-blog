# Deno Blog

This is an experimental blogging API powered by [deno](https://deno.land/), [oak](https://github.com/oakserver/oak) and MySQL.

| :bell: NOTIFICATION |
|:--------------------|
| This is a simplified version of the actual code base created for my medium article titled [Making APIs in Deno](https://medium.com/@farhanhasin/making-apis-in-deno-83dedda9dd1f). If you want the original code, please check the master branch. |

| :warning: WARNING |
|:------------------|
| The code from this API should not be deemed as ideal as all the functionalities are implemented in a very naive way. The goal was to test things out with this new runtime, not to build a production quality API. |

## Development Task List

- Blogs :heavy_check_mark:
- Authentication :heavy_check_mark:
- Documentation :heavy_check_mark:
- [Detailed Tutorial](https://medium.com/swlh/making-apis-in-deno-83dedda9dd1f?source=friends_link&sk=396c0dee437989ba3d2c2cc46d7d5933) :heavy_check_mark:

## System Requirements

- [Deno 1.0+](https://deno.land/)
- [MySQL 5+](https://www.mysql.com/downloads/)

## Libraries Used

- [oak](https://deno.land/x/oak)
- [deno_mysql](https://deno.land/x/mysql)
- [bcrypt](https://deno.land/x/bcrypt)
- [djwt](https://deno.land/x/djwt)
- [dotenv](https://deno.land/x/dotenv)
- [slugify](https://deno.land/x/slugify)

## Project Structure

```bash
.
├── LICENSE
├── README.md
├── app.ts
├── controllers
│   ├── auth.ts
│   └── blogs.ts
├── db
│   └── mysql.ts
├── makefile
├── middleware
│   ├── authorize.ts
│   ├── error.ts
│   ├── logger.ts
│   └── timer.ts
├── postman-collection
│   └── deno-blog.postman_collection.json
└── routes
    ├── auth.ts
    └── blogs.ts
```

There are four directories in the project:

- `controllers` directory contains logic for all the api endpoints. Logic for a certain endpoint is encapsulated inside relevantly named file.
  - `auth.ts` contains logic regarding registration of users and generation of JWT tokens.
  - `blogs.ts` contains logic regarding CRUD operations of blog posts.
- `db` directory contains necessary code for connecting to the database.
- `middleware` directory contains middleware functions for reusability.
  - `authorize.ts` handles validation of JWT tokens.
  - `error.ts` handles all errors centrally.
  - `logger.ts` logs all requests to the console.
  - `timer.ts` logs request times to the console.
- `routes` contains necessary code for registering the controller functions as middleware route endpoints.

There are two orphan files in the project root:

- `app.ts` is responsible for registering all endpoints to the main app instance and firing up the server.
- `makefile` contains one function for running the application.

## Instructions

Clone this repository anywhere you want.

Create a new MySQL database and use following query to create the tables:

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
make run
```

## Postman Collection

The `postman-collection/deno-blog.postman_collection.json` file can be imported inside [Postman](https://www.postman.com/) for testing out the endpoints.
