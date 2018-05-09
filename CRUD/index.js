const fs = require('fs');
const path = require('path');
const shell = require('electron').shell

btnCreate = document.getElementById('btnCreate')
btnRead = document.getElementById('btnRead')
btnDelete = document.getElementById('btnDelete')
fileName = document.getElementById('fileName')
fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files');

btnCreate.addEventListener('click', function(){
    shell.showItemInFolder('/home/levi/code/electron/CRUD/Files/.')
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function(err){
        if (err){
            console.log('err')
        }
        console.log('the file has been saved')
    })
    shell.openItem(`/home/levi/code/electron/CRUD/Files/${fileName.value}`)
})

btnRead.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)
    fs.readFile(file, function(err,data){
        if (err){
            console.log(err)
           path.join() 
        }
        fileContents.value = data
    })
})

btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)
    fs.unlink(file, function(err,data){
        if (err){
            console.log(err)
           path.join() 
        }
        fileName.value = '';
        fileContents.value =  '';
        console.log('the file was deleted')
    })
})