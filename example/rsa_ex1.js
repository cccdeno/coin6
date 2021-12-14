import * as RSA from "../src/rsa.ts"

let text = "hello!"
let data = new TextEncoder().encode(text)
let keyPair = await RSA.genKeyPair()
let signature = await RSA.sign(data, keyPair.privateKey)
let valid = await RSA.isValid(data, signature, keyPair.publicKey)
console.log('valid=', valid)
