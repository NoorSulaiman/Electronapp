console.log('main process working')

const electron = require("electron");
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win, dimWindow;
let parentWindow, childWindow;

function createWindow() {

  // win = new   BrowserWindow();
  // dimWindow = new BrowserWindow({width:400, height: 400, maxWidth:600 , maxHeight: 600, backgroundColor: '#8c8c8c', frame:false});
  parentWindow = new BrowserWindow({title:'parent'});
  childWindow = new BrowserWindow({parent : parentWindow, modal:true, title:'child'})
  childWindow.loadURL('https://noorsulaiman.github.io')
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
