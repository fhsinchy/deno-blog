FROM hayd/alpine-deno:latest

EXPOSE 3000

WORKDIR /usr/app

COPY ./deps.ts .
RUN deno cache deps.ts

COPY . .

# CMD [ "run", "--unstable", "--allow-net", "--allow-env" "--allow-read" "app.ts" ]