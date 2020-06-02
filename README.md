# Deno Blog

This is an experimental blogging API powered by [deno](https://deno.land/), [oak](https://github.com/oakserver/oak) and MySQL.

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
- [denon](https://github.com/denosaurs/denon#install)
- [velociraptor](https://github.com/umbopepato/velociraptor#install)

> Please make sure you've installed `denon` and `velociraptor` from above mentioned links.

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
├── scripts.json
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

There are seven directories in the project:

- `api` contains `server.ts`, responsible for initiating the application instance. It also registers three universal middleware.
- `controllers` directory contains logic for all the api endpoints. Logic for a certain endpoint is encapsulated inside relevantly named file.
  - `auth.ts` contains logic regarding registration of users and generation of JWT tokens.
  - `blogs.ts` contains logic regarding CRUD operations of blog posts.
- `db` directory contains necessary code for connecting to the database.
- `helpers` contains small helper functions for reusability.
- `middleware` directory contains middleware functions for reusability.
  - `authorize.ts` handles validation of JWT tokens.
  - `error.ts` handles all errors centrally.
  - `logger.ts` logs all requests to the console.
  - `timer.ts` logs request times to the console.
- `models` contains classes containing functions for querying the database.
- `routes` contains necessary code for registering the controller functions as middleware route endpoints.

There are two orphan files in the project root:

- `app.ts` is responsible for registering all endpoints to the main app instance and firing up the server.
- `scripts.json` contains commands for running the application, creating and dropping database tables.

## Instructions

Clone this repository anywhere you want. Make a copy of the `.env.example` file named `.env` and fill up the environment variables.

Create a new MySQL database and use following command to create the tables:

```bash
vr run tables:create
```

To run the application with auto reload, use following command:

```bash
vr run dev
```

To get a list of all `velociraptor` scripts run following command:

```bash
vr
```

## Postman Collection

The `postman-collection/deno-blog.postman_collection.json` file can be imported inside [Postman](https://www.postman.com/) for testing out the endpoints.
