import * as user from './src/user.js'

// action: user op target ... 
export function action(args) {
    let op = args[0]
    let f = user[op]
    if (f != null) {
        f(args[1], args.slice(2))
    } else {
        console.log(`op=(${op}) not found!`)
    }
}

console.log('args=', Deno.args)
action(Deno.args)
