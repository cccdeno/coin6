import { RSA } from './rsa.js'

export async function create() {
    console.log('creating wallet...')
    const key = new RSA()
    key.generateKeyPair(2048)
    let privateKey = key.exportKey('pkcs8-private-pem')
    let publicKey = key.exportKey('pkcs8-public-pem')
    let wallet = {
        publicKey,
        privateKey,
    }
    console.log('wallet=', wallet)
    return wallet
}
