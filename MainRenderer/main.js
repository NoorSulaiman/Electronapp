console.log('main process working')
console.log('main.js');
const electron = require("electron");
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let winone, winTwo;

function createWindow() {

  winone = new   BrowserWindow();
  winTwo = new   BrowserWindow();
  winone.loadURL(url.format({
    pathname: path.join(__dirname, 'one.html'),
    protocol: 'file',
    slashes: true
  }));

  winTwo.loadURL(url.format({
    pathname: path.join(__dirname, 'two.html'),
    protocol: 'file',
    slashes: true
  }));

  winone.webContents.openDevTools();
  winTwo.webContents.openDevTools();

  winone.on('closed', ()=>{
    win = null;
  })

  winTwo.on('closed', ()=>{
    win = null;
  })
};

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
