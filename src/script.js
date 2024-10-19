// Electron integrate
const { ipcRenderer } = require("electron")
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('WinAppLocalTheme')
})
const os = require('os')
let osVersion = os.version()
let is11 = osVersion.includes('Windows 11')

// Electron: Check is os == Win11
if (is11) {
    document.body.className = 'micaVersion'
}