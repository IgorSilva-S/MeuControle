setInterval(() => {
    const date = new Date()

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const weekDay = date.getDay()
    const hour = date.getHours()
    const minutes = date.getMinutes()

    let extWeekDay
    let extMonth

    if (weekDay == 0) {
        extWeekDay = 'Domingo'
    } else if (weekDay == 1) {
        extWeekDay = 'Segunda'
    } else if (weekDay == 2) {
        extWeekDay = 'Terça'
    } else if (weekDay == 3) {
        extWeekDay = 'Quarta'
    } else if (weekDay == 4) {
        extWeekDay = 'Quinta'
    } else if (weekDay == 5) {
        extWeekDay = 'Sexta'
    } else if (weekDay == 6) {
        extWeekDay = 'Sábado'
    }

    if (month == 0) {
        extMonth = 'janeiro';
    } else if (month == 1) {
        extMonth = 'fevereiro';
    } else if (month == 2) {
        extMonth = 'março';
    } else if (month == 3) {
        extMonth = 'abril';
    } else if (month == 4) {
        extMonth = 'maio';
    } else if (month == 5) {
        extMonth = 'junho';
    } else if (month == 6) {
        extMonth = 'julho';
    } else if (month == 7) {
        extMonth = 'agosto';
    } else if (month == 8) {
        extMonth = 'setembro';
    } else if (month == 9) {
        extMonth = 'outubro';
    } else if (month == 10) {
        extMonth = 'novembro';
    } else if (month == 11) {
        extMonth = 'dezembro';
    }

    const zFill = (n) => {
        return ('0' + n).slice(-2)
    }

    document.getElementById('hours').innerText = zFill(hour)
    document.getElementById('minutes').innerText = zFill(minutes)

    document.getElementById('weekDay').innerText = extWeekDay
    document.getElementById('day').innerText = zFill(day)
    document.getElementById('month').innerText = extMonth
    document.getElementById('year').innerText = year
}, 1);