import * as sha from './sha.js'
import * as chain from "./chain.js"
import * as lib from "./lib.js"

const zeros = "00000000000000000000000000000000000000000000000000" 
const nonceMax = 100000000

export function mine(block, zeroLen=4, maxTimes=1000000000) {
  for (var i=0; i<maxTimes; i++) {
    block.nonce = Math.floor(Math.random()*nonceMax)
    block.hash = ""
    let h = sha.hash(JSON.stringify(block))
    if (h.startsWith(zeros.substring(0, zeroLen))) {
        block.hash = h
        return block
    }
  }
}

const sleepInterval = 100

export async function mining() {
    console.log('mining...')
    var mineId = chain.getNumber('mineId')
    let bprev= (mineId>0)?await chain.readBlock(mineId-1):{hash:""}
    while (true) {
      mineId = chain.getNumber('mineId')
      var size = chain.getNumber('size')
      if (mineId >= size-1) {
        await lib.sleep(sleepInterval)
        continue
      } else {
        let b= await chain.readBlock(mineId)
        mine(b, chain.getNumber('zeros'))
        b.prev = bprev.hash
        console.log('mine:block=', b)
        await chain.writeBlock(b)
        bprev = b
        chain.addNumber('mineId', 1)
      }
    }
}
