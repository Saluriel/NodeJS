const fs = require('fs')
const process = require('process')
const axios = require('axios')

let path
let newFile

if (process.argv[2] === '--out') {
    newFile = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if ((path.slice(0, 4)) == 'http') {
    webCat(path, newFile)
} else {
    cat(path, newFile)
}

function makeFile(data, newFile) {
    if (newFile) {
        fs.writeFile(newFile, data, 'utf8', err => {
            if (err) {
                console.log(`Could not write ${newFile}: ${err}`)
                process.kill(1)
            }
        })
    } else {
        console.log('Data:', data)
    }
}

function cat(path, newFile) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR", err);
            process.kill(1)
        } else {
            makeFile(data, newFile)
        }
    })
}
// cat(process.argv[2])

async function webCat(URL, newFile) {
    let resp = await axios.get(URL)
        .then(function (resp) {
            makeFile(resp.data, newFile)
        })
        .catch(function (err) {
            console.log(`Error fetching ${err.config.url}`)
            console.log('Code:', err.code)
            process.kill(1)
        })
}
// webCat(process.argv[2])





