const fs = require("fs")
const express = require("express")

const app = express()
function RemoveOldFile(name){
    fs.unlink(`files/${name}.txt`, (err) => {
        if (err) console.log(err); // если возникла ошибка    
        else console.log("hello.txt was deleted");
      });
}
function GetFileName() {
    let arr = [],
        str = ''
    for (let i = 0; i < 1000; i++) {
        arr.push(Math.floor((Math.random() * (999999 - 100000) + 100000)).toString(2))
    }
    arr.forEach(e => {
        str += e + '\n'
    })
    obj = {
        name: `${ arr.length}`,
        value: str
    }
    return obj
}

function fileHandler(obj) {
    fs.open(`files/${obj.name}.txt`, 'w', (err) => {
        if (err) {
            throw err
        } else {
            fs.writeFile(`files/${obj.name}.txt`, obj.value, (err) => {
                if (err) {
                    throw err
                } else {
                  //  RemoveOldFile(obj.name)
                }
            })
        }
    })
}


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.get('/down', function (req, res) {
  //  fileHandler(GetFileName())
    res.download(__dirname + '/files/1.mp3')
    res.on('finish', function() {
        console.log(1)
    })
    // Set disposition and send it.
})
app.listen(3000)