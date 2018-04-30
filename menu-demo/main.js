console.log('main process working')

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;

let win;

function createWindow() {

  win = new BrowserWindow({ width: 800, height: 600 })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.webContents.openDevTools()
  win.on('closed', ()=>{
    win = null;
  })
};

app.on('ready', function () {
  createWindow();

  const template = [{
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
    {
      label: 'demo',
      submenu: [
        {
          label: 'submenu1',
          click: function(){
            console.log('clicked submenu 1')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'submenu2'
        }
      ]
    },
    {
      label: 'help',
      submenu:[
      {
        label: 'about electron',
        click: function(){
        electron.shell.openExternal('http://electron.atom.io')
        
               },
               accelerator: 'CmdorCtrl + Shift + H'
      }
    ]
    }
  ]
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu();
  ctxMenu.append(new MenuItem({
    label: 'Helo',
    click: function(){
      console.log('contxt menu')
    
    }
  },{role: 'selectall'} ))
  ctxMenu.append(new MenuItem({
    role: 'selectall'
  }))
  win.webContents.on('context-menu', function(e,params){
    ctxMenu.popup(win,params.x,params.y)
  })

  globalShortcut.register('Ctrl + 1', function(){
     win.show()
  })
});
app.on('will-quit', function(){
  globalShortcut.unregisterAll()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

