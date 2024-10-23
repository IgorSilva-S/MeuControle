/*const animContainer = document.getElementById('mouseMove')

animContainer.addEventListener('mousemove', (e) => {
    let block = document.createElement('div')
    block.setAttribute('class', 'moveBlock')
    block.style.top = `${e.clientY}px`
    block.style.left = `${e.clientX}px`
    block.addEventListener('animationend', () => {
        block.remove()
    })
    animContainer.insertAdjacentElement('afterbegin', block)
})*/

/*for (let i = 1; i<=6; i++) {
    let randX = Math.floor((Math.random() * 90) + 1)
    let randY = Math.floor((Math.random() * 440) + 1)
    if (isTimeSizeSmall) {
      randY = Math.floor((Math.random() * 100) + 1)
    }
    document.getElementById(`block${i}`).style.top = `${randY}px`
    document.getElementById(`block${i}`).style.left = `${randX}%`
    document.getElementById(`block${i}`).addEventListener('animationiteration', () => {
        let randX = Math.floor((Math.random() * 90) + 1)
        let randY = Math.floor((Math.random() * 440) + 1)
        if (isTimeSizeSmall) {
          randY = Math.floor((Math.random() * 100) + 1)
        }
        document.getElementById(`block${i}`).style.top = `${randY}px`
        document.getElementById(`block${i}`).style.left = `${randX}%`
    })
    document.getElementById(`Sblock${i}`).style.top = `${randY}px`
    document.getElementById(`Sblock${i}`).style.left = `${randX}%`
    document.getElementById(`Sblock${i}`).addEventListener('animationiteration', () => {
        let randX = Math.floor((Math.random() * 90) + 1)
        let randY = Math.floor((Math.random() * 440) + 1)
        document.getElementById(`Sblock${i}`).style.top = `${randY}px`
        document.getElementById(`Sblock${i}`).style.left = `${randX}%`
    })
}

function animRand() {
    let animContainer = document.getElementById('mouseMove')
    let randTime = Math.floor(Math.random() * 6)
    console.log(randTime)
    animContainer.className = 'timeMouseMove'
    if (randTime == 1) {
      animContainer.classList.add('okayTime')
    } else if (randTime == 2) {
      animContainer.classList.add('goodTime')
    } else if (randTime == 3) {
      animContainer.classList.add('mehTime')
    } else if (randTime == 4) {
      animContainer.classList.add('badTime')
    }  else if (randTime == 5) {
      animContainer.classList.add('horribleTime')
    }
}*/

let animContainer = document.getElementById('mouseMove')
animContainer.addEventListener('animationend', () => {
  document.getElementById('userPage').classList.remove('firstTime')
})