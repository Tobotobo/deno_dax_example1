import $ from "https://deno.land/x/dax@0.39.2/mod.ts";

sayHello("東京 太郎");

export async function sayHello(userName: string) {
  await $.raw`echo "Hello, ${userName}!"`;
}
