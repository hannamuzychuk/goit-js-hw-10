// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = 0;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
      const pickedData = selectedDates[0];

      if (pickedData <= new Date()) {
          startBtn.disabled = true;

          iziToast.error({
              message: "Please choose a date in the future",
              position: "topRight",
          });

          return;
      }

      userSelectedDate = pickedData;
      startBtn.disabled = false;
  },
};

flatpickr("#datetime-picker", options);


startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const different = userSelectedDate - now;

        if (different <= 0) {
            clearInterval(timerId);
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            input.disabled = false;
            return;
        }

        const time = convertMs(different);
        updateTimer(time);
    }, 1000);
});

function updateTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = days;
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
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
