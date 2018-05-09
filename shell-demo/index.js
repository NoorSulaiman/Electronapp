const openBtn = document.getElementById('openBtn')
const shell = require('electron').shell

openBtn.addEventListener('click', function(){
    shell.showItemInFolder('/home/levi/code/bastia/README.md')
    shell.openItem('/home/levi/code/bastia/README.md')
    shell.openExternal('http://electron.atom.io')
})