console.log('main process working')

const electron = require("electron");
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const dialog = electron.dialog;
let win;

function createWindow() {

  win = new   BrowserWindow();
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));
  win.webContents.openDevTools()
  win.on('closed', ()=>{
    win = null;
  })
};


ipc.on('open-err-msgbox', function(event) {
    dialog.showErrorBox('An err Msg', 'Demo of an error msg')
    event.sender.send('opened-err-msg', 'hello from the main process')
});

ipc.on('async-msg', function(event) {
  event.sender.send('async-reply', 'hello from the main process this is ASYNC msg')
});

ipc.on('sync-msg', function(event) {
  event.returnValue = 'sync-reply'
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});
