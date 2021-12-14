export function get(name) {
    return localStorage.getItem(name)
}

export function set(name, value) {
    return localStorage.setItem(name, value.toString())
}

export function getObj(name) {
    let json = get(name)
    return JSON.parse(json)
}

export function setObj(name, obj) {
    let json = JSON.stringify(obj)
    return localStorage.setItem(name, json)
}

export function getNumber(name) {
    let str = get(name)
    return parseFloat(str)
}

export function setNumber(name, n) {
    localStorage.setItem(name, n.toString())
}

export function addNumber(name, n) {
    let x = getNumber(name)
    localStorage.setItem(name, x+n)
}
