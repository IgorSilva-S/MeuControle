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

// DevKeys integrated with Electron
const iconOpenDevTools = document.getElementById('iconOpenDevTools')
iconOpenDevTools.addEventListener('click', () => {
    ipcRenderer.send('openDevTools')
})

const sendNotification = document.getElementById('devKeysNotify')
sendNotification.addEventListener('click', () => {
    ipcRenderer.send('showDevKeysNotification')
})

const killExplorer = document.getElementById('killExplorer')
killExplorer.addEventListener('click', () => {
    ipcRenderer.send('killExplorer')
})

const startExplorer = document.getElementById('startExplorer')
startExplorer.addEventListener('click', () => {
    ipcRenderer.send('startExplorer')
})

// LocalStorage automation
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isTimeSizeSmall') == 'true') {
        document.getElementById('mouseMove').style.height = '132px'
        document.getElementById('acrylicPart').setAttribute('style', 'height: 132px; justify-content: flex-start; box-sizing: border-box; padding-left: 100px; padding-top: 0')
        document.getElementById('myPageTitle').style.display = 'none'
        document.getElementById('roundCorner').style.top = '120px'
        document.getElementById('leftCorner').style.top = '132px'
        document.getElementById('rightCorner').style.top = '132px'
        document.getElementById('textScreenTime').style.display = 'none'
        document.getElementById('screenTimeWatch').setAttribute('textType', 'titleLarge')
        document.getElementById('iconTimeButton').innerHTML = '&#xE8C4;'
        document.getElementById('items').setAttribute('style', 'height: calc(100vh - 130px); top: 132px;')
        isTimeSizeSmall = true
    }


    setTimeout(() => {
        document.getElementById('loadAll').style.opacity = '0'
        setTimeout(() => {
            document.getElementById('loadAll').style.display = 'none'
        }, 300);
    }, 2000);

    if (!isFullDeveloperVersion) {
        devKeysHeader.style.display = 'none'
    }

})

// Is Full Developer Version? 
const isFullDeveloperVersion = true

// Pages
const welcomePage = document.getElementById('welcomePage')
const setupPage = document.getElementById('setupPage')
const userPage = document.getElementById('userPage')

// End pages variables

// Buttons
const setupButton = document.getElementById('setupButton')
const noSetupButton = document.getElementById('noSetupButton')
const setupToUP = document.getElementById('setupToUP')
const changeTimeVisibility = document.getElementById('changeTimeVisibility')

// End buttons variables

// Count time
let seconds = localStorage.getItem('secondsInScreen')
let minutes = localStorage.getItem('minutesInScreen')
let hours = localStorage.getItem('hoursInScreen')
const isSameDay = new Date()
let day = isSameDay.getDate()
let month = isSameDay.getMonth()
month++
let localStorageDay = localStorage.getItem('lastDayInPC')
if (localStorageDay != day) {
    localStorage.removeItem('secondsInScreen')
    localStorage.removeItem('minutesInScreen')
    localStorage.removeItem('hoursInScreen')
    seconds = 0
    minutes = 0
    hours = 0

    localStorage.setItem('lastDayInPC', day)
}
if (seconds == null) {
    seconds = 0
}

if (minutes == null) {
    minutes = 0
}

if (hours == null) {
    hours = 0
}
setInterval(() => {
    const isSameDay = new Date()
    let day = isSameDay.getDate()
    month++
    let localStorageDay = localStorage.getItem('lastDayInPC')
    if (localStorageDay != day) {
        localStorage.removeItem('secondsInScreen')
        localStorage.removeItem('minutesInScreen')
        localStorage.removeItem('hoursInScreen')
        seconds = 0
        minutes = 0
        hours = 0

        localStorage.setItem('lastDayInPC', day)
    }
    if (seconds < 59) {
        seconds++
    } else {
        seconds = 0
        minutes++
        if (minutes >= 60) {
            minutes = 0
            hours++
        }
    }

    localStorage.setItem('secondsInScreen', seconds)
    localStorage.setItem('minutesInScreen', minutes)
    localStorage.setItem('hoursInScreen', hours)

    let pageColor = document.getElementById('mouseMove')
    if (hours >= 4 && hours < 8) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add('okayTime')
    } else if (hours >= 8 && hours < 12) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add('goodTime')
    } else if (hours >= 12 && hours < 16) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add('mehTime')
    } else if (hours >= 16 && hours < 20) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add('badTime')
    } else if (hours >= 20) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add('horribleTime')
    } else {
        pageColor.className = 'timeMouseMove'
    }
    document.getElementById('minutesScreen').innerText = minutes
    document.getElementById('hoursScreen').innerText = hours

}, 1000);

// Navigation between pages code
function hideAllPages() {
    welcomePage.style.display = 'none'
    setupPage.style.display = 'none'
    userPage.style.display = 'none'
}

setupButton.addEventListener('click', () => {
    hideAllPages()
    setupPage.removeAttribute('style')
})

noSetupButton.addEventListener('click', () => {
    hideAllPages()
    userPage.removeAttribute('style')
})

// Setup page
const mediaBar = document.getElementById('mediaBar')
const mediaButton = document.getElementById('openMediaBar')
let isMediaBarOpened = false
mediaButton.addEventListener('click', () => {
    if (!isMediaBarOpened) {
        document.getElementById('alertOpenMediaBar').classList.add('openExpose');
        mediaBar.style.left = '0'
        isMediaBarOpened = true
    } else {
        document.getElementById('alertOpenMediaBar').classList.remove('openExpose')
        mediaBar.removeAttribute('style')
        isMediaBarOpened = false
    }
})

//Setup Page - Navigation
const UD_A1 = document.getElementById('controlScreen')
const UD_A2 = document.getElementById('screenTimer')
const UD_A3 = document.getElementById('sleepTime')
const UD_A2A3 = document.getElementById('UDop2a3')
const goalToNext = document.getElementById('goalToNextPage')

//Pages
const startPage = document.getElementById('startPage')
const endPage = document.getElementById('endPage')

function clearAllSetupPages() {
    startPage.style.display = 'none'
    endPage.style.display = 'none'
}

goalToNext.addEventListener('click', () => {
    if (UD_A1.checked) {
        clearAllSetupPages()
        endPage.removeAttribute('style')
    }
})

setupToUP.addEventListener('click', () => {
    hideAllPages()
    userPage.style.display = 'block'
})

// User Page - Change time anim size
let isTimeSizeSmall = false
changeTimeVisibility.addEventListener('click', () => {
    if (!isTimeSizeSmall) {
        document.getElementById('mouseMove').style.height = '132px'
        document.getElementById('acrylicPart').setAttribute('style', 'height: 132px; justify-content: flex-start; box-sizing: border-box; padding-left: 100px; padding-top: 0')
        document.getElementById('myPageTitle').style.display = 'none'
        document.getElementById('roundCorner').style.top = '120px'
        document.getElementById('leftCorner').style.top = '132px'
        document.getElementById('rightCorner').style.top = '132px'
        document.getElementById('textScreenTime').style.display = 'none'
        document.getElementById('screenTimeWatch').setAttribute('textType', 'titleLarge')
        document.getElementById('iconTimeButton').innerHTML = '&#xE8C4;'
        document.getElementById('items').setAttribute('style', 'height: calc(100vh - 130px); top: 132px;')
        isTimeSizeSmall = true
        localStorage.setItem('isTimeSizeSmall', true)
    } else {
        document.getElementById('mouseMove').removeAttribute('style')
        document.getElementById('acrylicPart').removeAttribute('style')
        document.getElementById('myPageTitle').removeAttribute('style')
        document.getElementById('roundCorner').removeAttribute('style')
        document.getElementById('leftCorner').removeAttribute('style')
        document.getElementById('rightCorner').removeAttribute('style')
        document.getElementById('textScreenTime').removeAttribute('style')
        document.getElementById('screenTimeWatch').setAttribute('textType', 'display')
        document.getElementById('iconTimeButton').innerHTML = '&#xE8C5;'
        document.getElementById('items').removeAttribute('style')
        isTimeSizeSmall = false
        localStorage.setItem('isTimeSizeSmall', false)
    }
})

// User Page - Menus
const lockDeviceHeader = document.getElementById('lockDeviceMenu')
let isLockDeviceMenuOpened = false
lockDeviceHeader.addEventListener('click', () => {
    if (!isLockDeviceMenuOpened) {
        document.getElementById('lockDeviceComp').style.display = 'block'
        document.getElementById('exposeLockDevice').classList.add('openExpose');
        lockDeviceHeader.classList.add('openedBlock')
        isLockDeviceMenuOpened = true
    } else {
        document.getElementById('lockDeviceComp').removeAttribute('style')
        document.getElementById('exposeLockDevice').classList.remove('openExpose');
        lockDeviceHeader.classList.remove('openedBlock')
        isLockDeviceMenuOpened = false
    }
})

const settingsHeader = document.getElementById('settingsMenu')
let isSettingsMenuOpened = false
settingsHeader.addEventListener('click', () => {
    if (!isSettingsMenuOpened) {
        document.getElementById('settingsComp').style.display = 'block'
        document.getElementById('exposeSettings').classList.add('openExpose');
        settingsHeader.classList.add('openedBlock')
        isSettingsMenuOpened = true
    } else {
        document.getElementById('settingsComp').removeAttribute('style')
        document.getElementById('exposeSettings').classList.remove('openExpose');
        settingsHeader.classList.remove('openedBlock')
        isSettingsMenuOpened = false
    }
})

const devKeysHeader = document.getElementById('devKeysMenu')
let isDevKeysMenuOpened = false
devKeysHeader.addEventListener('click', () => {
    if (!isDevKeysMenuOpened) {
        document.getElementById('devKeysComp').style.display = 'block'
        document.getElementById('exposeDevKeys').classList.add('openExpose');
        devKeysHeader.classList.add('openedBlock')
        isDevKeysMenuOpened = true
    } else {
        document.getElementById('devKeysComp').removeAttribute('style')
        document.getElementById('exposeDevKeys').classList.remove('openExpose');
        devKeysHeader.classList.remove('openedBlock')
        isDevKeysMenuOpened = false
    }
})

const infoHeader = document.getElementById('infoMenu')
let isInfoMenuOpened = false
infoHeader.addEventListener('click', () => {
    if (!isInfoMenuOpened) {
        document.getElementById('infoComp').style.display = 'block'
        document.getElementById('exposeInfo').classList.add('openExpose');
        infoHeader.classList.add('openedBlock')
        isInfoMenuOpened = true
    } else {
        document.getElementById('infoComp').removeAttribute('style')
        document.getElementById('exposeInfo').classList.remove('openExpose');
        infoHeader.classList.remove('openedBlock')
        isInfoMenuOpened = false
    }
})

const eraseHeader = document.getElementById('eraseMenu')
let isEraseMenuOpened = false
eraseHeader.addEventListener('click', () => {
    if (!isEraseMenuOpened) {
        document.getElementById('eraseComp').style.display = 'block'
        document.getElementById('exposeErase').classList.add('openExpose');
        eraseHeader.classList.add('openedBlock')
        isEraseMenuOpened = true
    } else {
        document.getElementById('eraseComp').removeAttribute('style')
        document.getElementById('exposeErase').classList.remove('openExpose');
        eraseHeader.classList.remove('openedBlock')
        isEraseMenuOpened = false
    }
})

// Info Menu
document.getElementById('openGitHubBrowser').addEventListener('click', () => {
    ipcRenderer.send('openGitHubInBrowser')
})

setInterval(() => {
    let isDark = window.matchMedia("(prefers-color-scheme: dark)")
    if (isDark.matches) {
        setDarkScheme()
    } else {
        setLightScheme()
    }
}, 1);