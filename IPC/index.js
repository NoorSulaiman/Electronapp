const electron = require("electron");
const ipc = electron.ipcRenderer;

btn = document.getElementById('errMsg');

btn.addEventListener('click', function(){
  ipc.send('open-err-msgbox')
});

ipc.on('opened-err-msg', function(event, arg){
  console.log(arg);
})


btn = document.getElementById('asyncBtn');

btn.addEventListener('click', function(){
  console.log('first msg')
  ipc.send('async-msg')
  console.log('second msg')
});
ipc.on('async-reply', function(event, arg){
  console.log(arg);
})

btn = document.getElementById('syncBtn');

btn.addEventListener('click', function(){
  console.log('first msg')
  const reply = ipc.sendSync('sync-msg');
  console.log(reply)
  console.log('second msg')
});
