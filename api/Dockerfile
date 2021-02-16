FROM hayd/alpine-deno:latest

EXPOSE 3000

WORKDIR /usr/app

COPY ./deps.ts .

RUN deno cache --unstable deps.ts

COPY . .

RUN deno cache --unstable app.ts

CMD [ "run", "--unstable", "--allow-net", "--allow-env", "--allow-read", "app.ts" ]