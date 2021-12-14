import * as lib from "./lib.js"
import * as wallet from "./wallet.js"
import * as chain from "./chain.js"
import * as miner from "./miner.js"

export async function create(target, options={}) {
    switch (target) {
        case 'wallet': await wallet.create(); break;
        case 'chain': await chain.create(); break;
        default: lib.error(`create target=${target} not found!`)
    }
}

export async function start(action, options={}) {
    switch (action) {
        case 'chaining': await chain.chaining(); break;
        case 'mining': await miner.mining(); break;
        default: lib.error(`start action=${action} not found!`)
    }
}

