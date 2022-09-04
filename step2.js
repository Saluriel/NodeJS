const fs = require('fs')
const process = require('process')
const axios = require('axios').default;

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR", err);
            process.kill(1)
        }
        console.log("DATA...", data)
    })
}

// cat(process.argv[2])


function webCat(URL) {
    axios.get(URL)
        .then(function (resp) {
            console.log(resp.data)
        })
        .catch(function (err) {
            console.log(`Error fetching ${err.config.url}`)
            console.log('Code:', err.code)
            process.kill(1)
        })
}

// webCat(process.argv[2])

let path = process.argv[2]

if ((path.slice(0, 4)) == 'http') {
    webCat(path)
} else {
    cat(path)
}