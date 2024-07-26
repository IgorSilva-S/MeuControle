const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: '#0000',
      symbolColor: "#f0f8ff",
      height: 40,
    },
   icon: 'src/icon/icon.ico'
    //skipTaskbar: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  //mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  ipcMain.on('lockDevice', () => {
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setFullScreen('true')
  })

  ipcMain.on('openDevTools', () => {
    mainWindow.webContents.openDevTools();
  })

    mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault()
    }
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
try {
	require('electron-reloader')(module);
} catch {}
const { systemPreferences } = require('electron')
const color = systemPreferences.getAccentColor()
console.log(color)

ipcMain.on('openGitHubInBrowser', () => {
  shell.openExternal("https://github.com/IgorSilva-S/MeuControle");
})