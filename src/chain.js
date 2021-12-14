import * as lib from './lib.js'
import * as storage from './storage.js'

export function getNumber(name) {
    return storage.getNumber(`chain.${name}`)
}

export function setNumber(name, value) {
    return storage.setNumber(`chain.${name}`, value)
}

export function addNumber(name, value) {
    return storage.addNumber(`chain.${name}`, value)
}

export async function create() {
    // chain = { size:0, mineId:0, zeros:4 }
    setNumber('size', 0)
    setNumber('mineId', 0)
    setNumber('zeros', 3)
    newBlock()
}

export async function newBlock() {
    let size = getNumber('size')
    let block = {
        id: size,
        nonce:"",
        body:"",
        prev:"",
        hash:"",
    }
    console.log('newBlock:', block.id)
    await lib.writeJson(`./data/block${block.id}.json`, block)
    addNumber('size', 1)
}

export async function readBlock(id) {
    return await lib.readJson(`./data/block${id}.json`)
}

export async function writeBlock(block) {
    return await lib.writeJson(`./data/block${block.id}.json`, block)
}

const interval = 1000*2 // 1000*60

export async function chaining() {
    while (true) {
        await lib.sleep(interval)
        newBlock()  
    }
}
