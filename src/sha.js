import { createHash } from 'https://deno.land/std/hash/mod.ts';

export function hash(text, alg='sha256') {
    const h = createHash(alg)
    h.update(text)
    return h.toString()
}
