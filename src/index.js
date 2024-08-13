const { app, BrowserWindow, ipcMain, shell, Notification, Tray, Menu } = require('electron');
const { PARAMS, VALUE, MicaBrowserWindow, IS_WINDOWS_11, WIN10 } = require('mica-electron');
const path = require('node:path');
let tray = null
let isWindowOpened = false
let mainWindow, micaMainWindow

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const exec = require('child_process').exec;

function execute(command) {
    exec(command);
};


const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
    icon: 'src/icon/icon.ico',
    //skipTaskbar: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  //mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  ipcMain.on('lockDevice', () => {
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setFullScreen('true');
  })

  ipcMain.on('openDevTools', () => {
    mainWindow.webContents.openDevTools();
  })

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault()
    }
    if (input.control && input.key.toLowerCase() === 'q') {
      event.preventDefault()
      mainWindow.webContents.send('completeCloseApp')
    }
  })

  mainWindow.on('close', (e) => {
    mainWindow.hide();
    isWindowOpened = false
  })
};

const createMicaWindow = () => {

  micaMainWindow = new MicaBrowserWindow({
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
    icon: 'src/icon/icon.ico',
    transparent: false,
    //skipTaskbar: true,
  });

  micaMainWindow.setAutoTheme();
  micaMainWindow.setRoundedCorner();
  micaMainWindow.setMicaEffect();

  micaMainWindow.loadFile(path.join(__dirname, 'index.html'));

  ipcMain.on('lockDevice', () => {
    micaMainWindow.setAlwaysOnTop(true, 'screen-saver');
    micaMainWindow.setFullScreen('true');
  })

  ipcMain.on('openDevTools', () => {
    micaMainWindow.webContents.openDevTools();
  })

  micaMainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault()
    }
  })

  micaMainWindow.minimize()
  micaMainWindow.restore()

  micaMainWindow.on('close', (e) => {
    micaMainWindow.hide();
    isWindowOpened = false
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (IS_WINDOWS_11) {
    createMicaWindow();
    isWindowOpened = true
  } else {
    createWindow()
    isWindowOpened = true
  }

  tray = new Tray('src/icon/icon.ico')
  tray.setToolTip('Meu Controle')
  tray.on('click', () => {
    if (!isWindowOpened) {
      if (IS_WINDOWS_11) {
        micaMainWindow.show();
        isWindowOpened = true
      } else {
        mainWindow.show();
        isWindowOpened = true
      }
    }
  })

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (!IS_WINDOWS_11) {
        createWindow();
      } else {
        createMicaWindow()
      }
    }
  });
});

ipcMain.on('appCanClose', () => {
  app.quit()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
/*app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('App quit function')
    isWindowOpened = false
  }
});*/

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
try {
  require('electron-reloader')(module);
} catch { }

ipcMain.on('openGitHubInBrowser', () => {
  shell.openExternal("https://github.com/IgorSilva-S/MeuControle");
})

app.setAppUserModelId(process.execPath)

const NOTIFICATION_TITLE = 'Meu Controle - DevKeys'
const NOTIFICATION_BODY = 'Notificação de teste, enviada pelo DevKeys, tudo funcionando corretamente!'

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

ipcMain.on('showDevKeysNotification', showNotification)
// call the function

  ipcMain.on('killExplorer', () => {
    exec('taskkill -f -im "explorer.exe"')
  })

  ipcMain.on('startExplorer', () => {
    exec("explorer.exe")
  })

