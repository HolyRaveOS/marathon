// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

document.addEventListener('DOMContentLoaded', () => {
  const dataTime = document.body
  let dataTimeVal = parseInt(dataTime.getAttribute('data-time'))

  let leftUntil =
    parseInt(localStorage.getItem('leftUntil')) ?? dataTimeVal * 3600 * 1000

  const hoursVal = document.querySelectorAll(
    '.timer-block__hours .timer-block__val'
  )
  const minutesVal = document.querySelectorAll(
    '.timer-block__minutes .timer-block__val'
  )
  const secondsVal = document.querySelectorAll(
    '.timer-block__seconds .timer-block__val'
  )
  const hoursText = document.querySelectorAll(
    '.timer-block__hours .timer-block__text'
  )
  const minutesText = document.querySelectorAll(
    '.timer-block__minutes .timer-block__text'
  )
  const secondsText = document.querySelectorAll(
    '.timer-block__seconds .timer-block__text'
  )

  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2]
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ]
  }

  const timeCount = () => {
    if (leftUntil > 0) {
      leftUntil -= 1000
      localStorage.setItem('leftUntil', leftUntil.toString())
    } else {
      leftUntil = dataTimeVal * 3600 * 1000
      localStorage.setItem('leftUntil', leftUntil.toString())
    }

    let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24
    let minutes = Math.floor(leftUntil / 1000 / 60) % 60
    let seconds = Math.floor(leftUntil / 1000) % 60
    if (hours <= 0) hours = 0
    if (minutes <= 0) minutes = 0
    if (seconds <= 0) seconds = 0

    hoursVal.forEach((el) => {
      el.innerText = hours < 10 ? '0' + hours : hours
    })

    minutesVal.forEach((el) => {
      el.innerText = minutes < 10 ? '0' + minutes : minutes
    })

    secondsVal.forEach((el) => {
      el.innerText = seconds < 10 ? '0' + seconds : seconds
    })

    hoursText.forEach((el) => {
      el.innerText = declOfNum(hours, ['Година', 'Години', 'Годин'])
    })
    minutesText.forEach((el) => {
      el.innerText = declOfNum(minutes, ['Хвилина', 'Хвилини', 'Хвилин'])
    })
    secondsText.forEach((el) => {
      el.innerText = declOfNum(seconds, ['Секунда', 'Секунди', 'Секунд'])
    })
  }

  timeCount()
  setInterval(timeCount, 1000)
})
