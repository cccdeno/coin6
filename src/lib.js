
export function error(args) {
    console.log('Error:', args)
}

export async function writeJson(file, obj) {
    await Deno.writeTextFile(file, JSON.stringify(obj, null, 2));
}

export async function readJson(file) {
    let text = await Deno.readTextFile(file)
    return JSON.parse(text)
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
