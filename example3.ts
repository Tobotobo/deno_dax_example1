import $ from "https://deno.land/x/dax@0.39.2/mod.ts";

const result = await $`./hello.exe`.text();
console.log(result);
