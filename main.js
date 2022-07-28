const { app, BrowserWindow } = require("electron");
const path = require('path')

require('@electron/remote/main').initialize()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 950,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    }
  });

  win.loadURL('https://imgur-galleries.vercel.app/')

  // win.webContents.openDevTools(); //Uncomment to show dev tools
};


app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
