import { assert } from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "checking deno version",
  fn(): void {
    const version: any = Deno.env.get("DENO_VERSION");
    assert(parseInt(version) >= 1);
  },
});