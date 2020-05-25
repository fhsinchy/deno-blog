install:
	deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts

run:
	denon run --unstable --allow-net --allow-env --allow-read app.ts