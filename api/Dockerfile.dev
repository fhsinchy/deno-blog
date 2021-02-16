FROM hayd/alpine-deno:latest

EXPOSE 3000

RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts

WORKDIR /usr/app

COPY ./deps.ts .

RUN deno cache --unstable deps.ts

COPY . .

RUN deno cache --unstable app.ts

ENTRYPOINT [ "/usr/local/bin/denon" ]

CMD [ "run", "--unstable", "--allow-net", "--allow-env", "--allow-read", "app.ts" ]