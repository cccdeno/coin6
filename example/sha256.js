// https://deno.com/blog/v1.11#more-web-crypto-apis-supported

import { encodeToString } from "https://deno.land/std@0.97.0/encoding/hex.ts";
const data = new TextEncoder().encode("Deno 1.11 has been released!");
const digest = await crypto.subtle.digest("sha-256", data.buffer);
console.log("Digest:", encodeToString(new Uint8Array(digest)));
