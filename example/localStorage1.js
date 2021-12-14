
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

if (localStorage.getItem('count')==null)
    localStorage.setItem('count', '0')
for (let i=0; i<100; i++) {
    let s = localStorage.getItem('count')
    let n = parseInt(s)
    console.log('n=', n)
    localStorage.setItem('count', (n+1).toString())
    await sleep(100)
}

