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


// Pages
const welcomePage = document.getElementById('welcomePage')
const setupPage = document.getElementById('setupPage')
const userPage = document.getElementById('userPage')

// End pages variables

// Buttons
const setupButton = document.getElementById('setupButton')
const noSetupButton = document.getElementById('noSetupButton')
const defaultPageInScreenTime = document.getElementById('endScreenTime')
const changeTimeVisibility = document.getElementById('changeTimeVisibility')

// End buttons variables

// Count time
let seconds = localStorage.getItem('secondsInScreen')
let minutes = localStorage.getItem('minutesInScreen')
let hours = localStorage.getItem('hoursInScreen')
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
const controlOnly = document.getElementById('defineControl')
const controlTime = document.getElementById('defineScreenTime')

controlOnly.addEventListener('change', () => {
    if (controlOnly.checked) {
        document.getElementById('controlSettings').removeAttribute('style')
        document.getElementById('timeScreenSettings').style.display = 'none'
    } else {
        document.getElementById('controlSettings').style.display = 'none'
        document.getElementById('timeScreenSettings').style.display = 'none'
    }
})

controlTime.addEventListener('change', () => {
    if (controlTime.checked) {
        document.getElementById('timeScreenSettings').removeAttribute('style')
        document.getElementById('controlSettings').style.display = 'none'
    } else {
        document.getElementById('controlSettings').style.display = 'none'
        document.getElementById('timeScreenSettings').style.display = 'none'
    }
})

// Screen time settings
const passwordRadio = document.getElementById('definePassword')
const nonPasswordRadio = document.getElementById('notDefinePassword')

passwordRadio.addEventListener('change', () => {
    if (passwordRadio.checked) {
        document.getElementById('passwordYes').removeAttribute('style')
    }
})

nonPasswordRadio.addEventListener('change', () => {
    if (nonPasswordRadio.checked) {
        document.getElementById('passwordYes').style.display = 'none'
    }
})

defaultPageInScreenTime.addEventListener('click', () => {
    //Password checker
    let password1 = document.getElementById('userPassword').value
    let password2 = document.getElementById('userPassword2').value
    let hoursTimer = document.getElementById('hours').value
    let minutesTimer = document.getElementById('minutes').value
    if (!nonPasswordRadio.checked && !passwordRadio.checked) {
        alert('Selecione uma das opções sobre a senha')
    } else {
        if (passwordRadio.checked && password1 == '' && password2 == '') {
            alert('Defina uma senha, ou escolha não criar uma senha')
        } else {
            if (password1 !== password2) {
                alert('As senhas não são as mesmas!')
                document.getElementById('contPass1').classList.add('input-danger')
                document.getElementById('contPass2').classList.add('input-danger')
            } else {
                if (hoursTimer == '' && minutesTimer == '') {
                    alert('Defina o seu tempo de uso diário!')
                } else {
                    if (hoursTimer != '') {
                        localStorage.setItem('maxHoursInScreen', hoursTimer)
                    }
                    if (minutesTimer != '') {
                        localStorage.setItem('maxMinutesInScreen', minutesTimer)
                    }

                    if (passwordRadio.checked) {
                        localStorage.setItem('userPassword', password2)
                    }

                    localStorage.setItem('initialSetup', 'complete')
                    localStorage.setItem('typeOfUse', 'screenTimer')
                }
            }
        }
    }
})

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
    }
})

// User Page - Menus
const devToolsHeader = document.getElementById('devKeysMenu')
let isDevKeysMenuOpened = false
devToolsHeader.addEventListener('click', () => {
    if (!isDevKeysMenuOpened) {
        document.getElementById('devKeysComp').style.display = 'block'
        isDevKeysMenuOpened = true
    } else {
        document.getElementById('devKeysComp').removeAttribute('style')
        isDevKeysMenuOpened = false
    }
})

// Info Menu
document.getElementById('openGitHubBrowser').addEventListener('click', () => {
    ipcRenderer.send('openGitHubInBrowser')
})
