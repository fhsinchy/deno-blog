# Deno Blog

This is an experimental blogging API developed with [Docker](https://www.docker.com/get-started), [Deno](https://deno.land/), [Oak](https://github.com/oakserver/oak) and [MySQL](https://www.mysql.com/).

| :bell: NOTIFICATION |
|:--------------------|
| This is a simplified version of the actual code base created for a medium article. If you want the original code, please check the master branch. |

| :warning: WARNING |
|:------------------|
| The code from this API should not be deemed as ideal as all the functionalities are implemented in a very naive way. The goal was to test things out with this new runtime, not to build a production quality API. |

## Development Task List

- Dockerization :heavy_check_mark:
- Blogs :heavy_check_mark:
- Authentication :heavy_check_mark:
- Documentation :heavy_check_mark:
- Detailed Tutorial :heavy_multiplication_x:

## System Requirements

- [Deno 1.0+](https://deno.land/)
- [Docker](https://www.docker.com/get-started)

## Libraries Used

- [oak](https://deno.land/x/oak)
- [deno_mysql](https://deno.land/x/mysql)
- [bcrypt](https://deno.land/x/bcrypt)
- [djwt](https://deno.land/x/djwt)
- [slugify](https://deno.land/x/slugify)

## Project Structure

```bash
.
├── Dockerfile
├── api
│   └── server.ts
├── app.ts
├── controllers
│   ├── auth.ts
│   └── blogs.ts
├── db
│   └── mysql.ts
├── docker-compose.yml
├── docker-entrypoint-initdb.d
│   ├── blogs.sql
│   └── users.sql
├── middleware
│   ├── authorize.ts
│   ├── error.ts
│   ├── logger.ts
│   └── timer.ts
└── routes
    ├── auth.ts
    └── blogs.ts
```

There are eight directories in the project -

- `api` contains `server.ts`, responsible for initiating the application instance. It also registers four universal middleware.
- `controllers` directory contains logic for all the api endpoints. Logic for a certain endpoint is encapsulated inside relevantly named files.
  - `auth.ts` contains logic regarding registration of users and generation of JWT tokens.
  - `blogs.ts` contains logic regarding CRUD operations of blog posts.
- `db` directory contains necessary code for connecting to the database.
- `docker-entrypoint-initdb.d` contains sql files for initializing the database.
- `middleware` directory contains middleware functions for reusability.
  - `authorize.ts` handles validation of JWT tokens.
  - `error.ts` handles all errors centrally.
  - `logger.ts` logs all requests to the console.
  - `timer.ts` logs request times to the console.
- `models` contains classes containing functions for querying the database.
- `routes` contains necessary code for registering the controller functions as middleware route endpoints.

There are four orphan files in the project root:

- `Dockerfile` for building the api container.
- `app.ts` is responsible for registering all endpoints to the main app instance and firing up the server.
- `docker-compose.yml` file for building and running multi-container application.

## Instructions

Clone this repository anywhere you want. Open up terminal and use following command to build and run the application -

```bash
docker-compose up --build
```

There will be a wall of text but look for something like following -

```bash
db_1   | 2020-06-08T17:27:05.115386Z 0 [Note] Event Scheduler: Loaded 0 events
db_1   | 2020-06-08T17:27:05.116258Z 0 [Note] mysqld: ready for connections.
db_1   | Version: '5.7.30'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
```

The application should be running on http://127.0.0.1:3000 address. A postman collection containing all the routes can be found inside `postman-collection` directory.

You can stop the application by pressing `control + c` combination. If you want to stop and delete all built images issue following command -

```bash
docker-compose down
```

Use following command if you don't want the containers and images to be deleted -

```bash
docker-compose stop
```

You can restart the application with following command -

```bash
docker-compose up
```

You can learn more about docker-compose command line interface from [Compose command-line reference](https://docs.docker.com/compose/reference/)

## Postman Collection

The `postman-collection/deno-blog.postman_collection.json` file can be imported inside [Postman](https://www.postman.com/) for testing out the endpoints.
