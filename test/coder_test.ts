// reference -- https://medium.com/deno-the-complete-reference/public-key-encryption-decryption-in-deno-f7304abe203d

import {ok} from 'https://deno.land/x/tdd/mod.ts'
import * as coder from "../src/coder.ts"

Deno.test("Cryptography (RSA) sign&verify", async () => {
    let text = "hello!"
    let data = new TextEncoder().encode(text)
    let fakeData = new TextEncoder().encode("hello ... ")

    let keyPair = await coder.genKeyPair()
    let signature = await coder.sign(data, keyPair.privateKey)
    ok(await coder.isValid(data, signature, keyPair.publicKey))
    ok(!await coder.isValid(fakeData, signature, keyPair.publicKey))

    // privateKey export/import
    var pem1 = await coder.exportPrivateKey(keyPair.privateKey)
    console.log('pem1=', pem1)
    var key2 = await coder.importPrivateKey(pem1)
    console.log('key2=', key2)
    var pem2 = await coder.exportPrivateKey(key2)
    console.log('pem2=', pem2)
    ok(pem1 === pem2)
    // publicKey export/import
    var pem1 = await coder.exportPublicKey(keyPair.publicKey)
    console.log('pem1=', pem1)
    console.log('publicKey=', keyPair.publicKey)
/*
    var key2 = await coder.importPublicKey(pem1)
    console.log('key2=', key2)
    var pem2 = await coder.exportPublicKey(key2)
    console.log('pem2=', pem2)
    ok(pem1 === pem2)
*/
})

Deno.test("Hash (SHA256)", async () => {
    let text = "hello!"
    console.log(`sha256(${text})=${coder.hash(text, 'sha256')}`)
    ok(coder.hash(text, 'sha256')==='ce06092fb948d9ffac7d1a376e404b26b7575bcc11ee05a4615fef4fec3a308b')
    // ok(await RSA.isValid(data, signature, keyPair.publicKey))
    // ok(!await RSA.isValid(fakeData, signature, keyPair.publicKey))
})

/*
Deno.test("private key import/export", async () => {
    const pem1 = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDD0tPV/du2vftjvXj1t/gXTK39sNBVrOAEb/jKzXae+Xa0H+3LhZaQIQNMfACiBSgIfZUvEGb+7TqXWQpoLoFR/R7MvGWcSk98JyrVtveD8ZmZYyItSY7m2hcasqAFiKyOouV5vzyRe87/lEyzzBpF3bQQ4IDaQu+K9Hj5fKuU6rrOeOhsdnJc+VdDQLScHxvMoLZ9Vtt+oK9J4/tOLwr4CG8khDlBURcBY6gPcLo3dPU09SW+6ctX2cX4mkXx6O/0mmdTmacr/vu50KdRMleFeZYOWPAEhhMfywybTuzBiPVIZVP8WFCSKNMbfi1S9A9PdBqnebwwHhX3/hsEBt2BAgMBAAECggEABEI1P6nf6Zs7mJlyBDv+Pfl5rjL2cOqLy6TovvZVblMkCPpJyFuNIPDK2tK2i897ZaXfhPDBIKmllM2Hq6jZQKB110OAnTPDg0JxzMiIHPs32S1d/KilHjGff4Hjd4NXp1l1Dp8BUPOllorR2TYm2x6dcCGFw9lhTr8O03Qp4hjn84VjGIWADYCk83mgS4nRsnHkdiqYnWx1AjKlY51yEK6RcrDMi0Th2RXrrINoC35sVv+APt2rkoMGi52RwTEseA1KZGFrxjq61ReJif6p2VXEcvHeX6CWLx014LGk43z6Q28P6HgeEVEfIjyqCUea5Du/mYb/QsRSCosXLxBqwQKBgQD1+fdC9ZiMrVI+km7Nx2CKBn8rJrDmUh5SbXn2MYJdrUd8bYNnZkCgKMgxVXsvJrbmVOrby2txOiqudZkk5mD3E5O/QZWPWQLgRu8ueYNpobAX9NRgNfZ7rZD+81vh5MfZiXfuZOuzv29iZhU0oqyZ9y75eHkLdrerNkwYOe5aUQKBgQDLzapDi1NxkBgsj9iiO4KUa7jvD4JjRqFy4Zhj/jbQvlvM0F/uFp7sxVcHGx4r11C+6iCbhX4u+Zuu0HGjT4d+hNXmgGyxR8fIUVxOlOtDkVJa5sOBZK73/9/MBeKusdmJPRhalZQfMUJRWIoEVDMhfg3tW/rBj5RYAtP2dTVUMQKBgDs8yr52dRmT+BWXoFWwaWB0NhYHSFz/c8v4D4Ip5DJ5M5kUqquxJWksySGQa40sbqnD05fBQovPLU48hfgr/zghn9hUjBcsoZOvoZR4sRw0UztBvA+7jzOz1hKAOyWIulR6Vca0yUrNlJ6G5R56+sRNkiOETupi2dLCzcqb0PoxAoGAZyNHvTLvIZN4iGSrjz5qkM4LIwBIThFadxbv1fq6pt0O/BGf2o+cEdq0diYlGK64cEVwBwSBnSg4vzlBqRIAUejLjwEDAJyA4EE8Y5A9l04dzV7nJb5cRak6CrgXxay/mBJRFtaHxVlaZGxYPGSYE6UFS0+3EOmmevvDZQBf4qECgYEA0ZF6Vavz28+8wLO6SP3w8NmpHk7K9tGEvUfQ30SgDx4G7qPIgfPrbB4OP/E0qCfsIImi3sCPpjvUMQdVVZyPOIMuB+rV3ZOxkrzxEUOrpOpR48FZbL7RN90yRQsAsrp9e4iv8QwB3VxLe7X0TDqqnRyqrc/osGzuS2ZcHOKmCU8=\n-----END PRIVATE KEY-----`;
    console.log('pem1=', pem1)
    let privateKey = await coder.importPrivateKey(pem1)
    console.log('privateKey=', privateKey)
    let pem2 = await coder.exportPrivateKey(privateKey)
    console.log('pem2=', pem2)
    ok(pem1 === pem2)
})

Deno.test("Coder:str2buf<=>buf2str", async () => {
    let text = "hello!"
    ok(text === coder.buf2str(coder.str2buf(text)))
})

Deno.test("Coder:hex2buf<=>buf2hex", async () => {
    let hex = "68656c6c6f0a"
    ok(hex === coder.buf2hex(coder.hex2buf(hex)))
})

Deno.test("public key import/export", async () => {
    // const pem1 = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3Xo3U13dc+xojwQYWoJLCbOQ5fOVY8LlnqcJm1W1BFtxIhOAJWohiHuIRMctv7dzx47TLlmARSKvTRjd0dF92jx/xY20Lz+DXp8YL5yUWAFgA3XkO3LSJgEOex10NB8jfkmgSb7QIudTVvbbUDfd5fwIBmCtaCwWx7NyeWWDb7A9cFxj7EjRdrDaK3ux/ToMLHFXVLqSL341TkCf4ZQoz96RFPUGPPLOfvN0x66CM1PQCkdhzjE6U5XGE964ZkkYUPPsy6Dcie4obhW4vDjgUmLzv0z7UD010RLIneUgDE2FqBfY/C+uWigNPBPkkQ+Bv/UigS6dHqTCVeD5wgyBQIDAQAB\n-----END PUBLIC KEY-----`;
    // console.log('pem1=', pem1)
    let publicKey = await coder.importPublicKey(pem1)
    console.log('publicKey=', publicKey)
    let pem2 = await coder.exportPublicKey(publicKey)
    console.log('pem2=', pem2)
    ok(pem1 === pem2)
})
*/
