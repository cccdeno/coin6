// https://github.com/rzcoder/node-rsa
import NodeRSA from "https://dev.jspm.io/node-rsa";

const key = new NodeRSA()
key.generateKeyPair(2048)
let privateKey = key.exportKey('pkcs8-private-pem')
console.log('privateKey=', privateKey)
let publicKey = key.exportKey('pkcs8-public-pem')
console.log('publicKey=', publicKey)

let obj = { name:'ccc', age:52 }

let data = JSON.stringify(obj) // "hello"
console.log('data=', data)

let signature = key.sign(data)
console.log('verified(data)=', key.verify(data, signature))
console.log('verified(data+c)=', key.verify(data+'c', signature))

let edata = key.encrypt(data)
console.log('edata=', edata)
let ddata = key.decrypt(edata, "json")
console.log('ddata=', ddata)

let key2 = key.importKey(publicKey, 'pkcs8-public-pem')
// console.log('key2=', key2)
console.log('key2.verified(data)=', key2.verify(data, signature))
console.log('key2.verified(data+c)=', key2.verify(data+'c', signature))
