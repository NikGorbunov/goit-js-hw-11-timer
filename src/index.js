import './sass/main.scss';
import Swal from 'sweetalert2'

const dateSelectorRef = document.querySelector("#date-selector")
dateSelectorRef.addEventListener("input", timerOnInput)
dateSelectorRef.addEventListener("click", timerOnPause)

const startButton = document.querySelector("[data-start]")
startButton.addEventListener("click", timerOnStart)

startButton.setAttribute("disabled", true)

const refs = {
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]")
}


let intervalId = null;
let currentDate = 0
let settledDate = 0
let deltaTime = 0

function pad(value) {
  return String(value).padStart(2, '0')
}

function timerOnStart() {
  currentDate = Date.now()
  deltaTime = settledDate - currentDate

  if (deltaTime > 0) {
      intervalId = setInterval(() => {
          currentDate = Date.now()
          deltaTime = settledDate - currentDate
          let { days, hours, minutes, seconds } = convertMs(deltaTime)

          if (deltaTime >= 0) {
            refs.daysEl.textContent = pad(days)
            refs.hoursEl.textContent = pad(hours)
            refs.minutesEl.textContent = pad(minutes)
            refs.secondsEl.textContent = pad(seconds)

          } else {
              clearInterval(intervalId)
          }

      }, 1000)
  }
}

function timerOnInput(event) {
  currentDate = Date.now()
  settledDate = Date.parse(event.target.value)
  deltaTime = settledDate - currentDate

  if (deltaTime < 0) {
    new Swal({
      text: 'Please choose a date in the future',
      icon: 'error',
    });
    startButton.setAttribute("disabled", true)
    ref.daysEl.textContent = '00'
    ref.hoursEl.textContent = '00'
    ref.minutesEl.textContent = '00'
    ref.secondsEl.textContent = '00'
} else {
  startButton.removeAttribute("disabled", true)
}
}

function timerOnPause() {
  clearInterval(intervalId)
}




function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = Math.floor(ms / day);
// Remaining hours
const hours = Math.floor((ms % day) / hour);
// Remaining minutes
const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}
