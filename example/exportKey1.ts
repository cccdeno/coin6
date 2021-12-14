
import {encode as he} from "https://deno.land/std/encoding/hex.ts";
import * as coder from "../src/coder.ts"

let text = "hello!"
let data = new TextEncoder().encode(text)
let keyPair = await coder.genKeyPair()
let signature = await coder.sign(data, keyPair.privateKey)
let valid = await coder.isValid(data, signature, keyPair.publicKey)
console.log('valid=', valid)

try {
  console.log('publicKey=', keyPair.publicKey)
  // const td=(d:Uint8Array)=>new TextDecoder().decode(d);
  const exportedPublicKeyBuffer = await crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey,
  );
  // console.log('exportedPublicKeyBuffer=', exportedPublicKeyBuffer)
  console.log('exportedPublicKeyBuffer=', new Uint8Array(exportedPublicKeyBuffer))
  // let publicKeyStr = new TextDecoder().decode(exportedPublicKeyBuffer)
  // console.log('publicKeyStr=', publicKeyStr)
  // const hexKey=td(he(new Uint8Array(exportedPublicKeyBuffer)));
  // console.log('hexKey=', hexKey)

  // hexKey: 308204bd300d06092a864886f70d0101010500038204aa.....e2c143114f03c18730c7cc24aa71c07f7f02575fb9f13e6

  const exportedPrivateKeyBuffer = await crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey,
  );
  // console.log('exportedPrivateKeyBuffer=', exportedPrivateKeyBuffer)
  console.log('exportedPrivateKeyBuffer=', new Uint8Array(exportedPrivateKeyBuffer))

  // let privateKeyStr = new TextDecoder().decode(exportedPrivateKeyBuffer)
  // console.log('privateKeyStr=', privateKeyStr)
  // const hexKey=td(he(new Uint8Array(exportedPrivateKeyBuffer)));
  // console.log('hexKey=', hexKey)
  // hexKey: 308204bd300d06092a864886f70d0101010500038204aa.....e2c143114f03c18730c7cc24aa71c07f7f02575fb9f13e6
} catch (error) {
  console.log('error=', error)
}
