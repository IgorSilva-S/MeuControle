// Electron integrate
const { ipcRenderer } = require("electron")
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('WinAppLocalTheme')
})


// DevKeys integrated with Electron
const iconOpenDevTools = document.getElementById('iconOpenDevTools')
iconOpenDevTools.addEventListener('click', () => {
    ipcRenderer.send('openDevTools')
})

// LocalStorage automation
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isTimeSizeSmall') == 'true') {
        document.getElementById('mouseMove').style.height = '132px'
        document.getElementById('acrylicPart').setAttribute('style', 'height: 132px; justify-content: flex-start; box-sizing: border-box; padding-left: 100px; padding-top: 0')
        document.getElementById('myPageTitle').style.display = 'none'
        document.getElementById('roundCorner').style.top = '120px'
        document.getElementById('textScreenTime').style.display = 'none'
        document.getElementById('screenTimeWatch').setAttribute('textType', 'titleLarge')
        document.getElementById('iconTimeButton').innerHTML = '&#xE8C4;'
        document.getElementById('items').setAttribute('style', 'height: calc(100vh - 130px); top: 120px;')
        isTimeSizeSmall = true
    }
})

// Pages
const welcomePage = document.getElementById('welcomePage')
const setupPage = document.getElementById('setupPage')
const userPage = document.getElementById('userPage')

// End pages variables

// Buttons
const setupButton = document.getElementById('setupButton')
const noSetupButton = document.getElementById('noSetupButton')
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
        pageColor.classList.add = 'okayTime'
    } else if (hours >= 8 && hours < 12) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add = 'goodTime'
    } else if (hours >= 12 && hours < 16) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add = 'mehTime'
    } else if (hours >= 16 && hours < 20) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add = 'badTime'
    } else if (hours >= 20) {
        pageColor.className = 'timeMouseMove'
        pageColor.classList.add = 'horribleTime'
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

// Setup page - Chooses

// User Page - Change time anim size
let isTimeSizeSmall = false
changeTimeVisibility.addEventListener('click', () => {
    if (!isTimeSizeSmall) {
        document.getElementById('mouseMove').style.height = '132px'
        document.getElementById('acrylicPart').setAttribute('style', 'height: 132px; justify-content: flex-start; box-sizing: border-box; padding-left: 100px; padding-top: 0')
        document.getElementById('myPageTitle').style.display = 'none'
        document.getElementById('roundCorner').style.top = '120px'
        document.getElementById('textScreenTime').style.display = 'none'
        document.getElementById('screenTimeWatch').setAttribute('textType', 'titleLarge')
        document.getElementById('iconTimeButton').innerHTML = '&#xE8C4;'
        document.getElementById('items').setAttribute('style', 'height: calc(100vh - 130px); top: 120px;')
        isTimeSizeSmall = true
        localStorage.setItem('isTimeSizeSmall', true)
    } else {
        document.getElementById('mouseMove').removeAttribute('style')
        document.getElementById('acrylicPart').removeAttribute('style')
        document.getElementById('myPageTitle').removeAttribute('style')
        document.getElementById('roundCorner').removeAttribute('style')
        document.getElementById('textScreenTime').removeAttribute('style')
        document.getElementById('screenTimeWatch').setAttribute('textType', 'display')
        document.getElementById('iconTimeButton').innerHTML = '&#xE8C5;'
        document.getElementById('items').removeAttribute('style')
        isTimeSizeSmall = false
        localStorage.setItem('isTimeSizeSmall', false)
    }
})

// User Page - Menus
const devToolsHeader = document.getElementById('devKeysMenu')
let isDevKeysMenuOpened = false
devToolsHeader.addEventListener('click', () => {
    if (!isDevKeysMenuOpened) {
        document.getElementById('devKeysComp').style.display = 'block'
        document.getElementById('exposeDevKeys').style.rotate = '180deg'
        isDevKeysMenuOpened = true
    } else {
        document.getElementById('devKeysComp').removeAttribute('style')
        document.getElementById('exposeDevKeys').removeAttribute('style')
        isDevKeysMenuOpened = false
    }
})

const infoHeader = document.getElementById('infoMenu')
let isInfoMenuOpened = false
infoHeader.addEventListener('click', () => {
    if (!isInfoMenuOpened) {
        document.getElementById('infoComp').style.display = 'block'
        document.getElementById('exposeInfo').style.rotate = '180deg'
        isInfoMenuOpened = true
    } else {
        document.getElementById('infoComp').removeAttribute('style')
        document.getElementById('exposeInfo').removeAttribute('style')
        isInfoMenuOpened = false
    }
})

// Info Menu
document.getElementById('openGitHubBrowser').addEventListener('click', () => {
    ipcRenderer.send('openGitHubInBrowser')
})
