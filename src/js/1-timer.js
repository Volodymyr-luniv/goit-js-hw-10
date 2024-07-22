import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  let userSelectedDate = null;
  const startButton = document.querySelector('button[data-start]');
  const dateTimePicker = document.querySelector('#datetime-picker');
  const daysEl = document.querySelector('.value[data-days]');
  const hoursEl = document.querySelector('.value[data-hours]');
  const minutesEl = document.querySelector('.value[data-minutes]');
  const secondsEl = document.querySelector('.value[data-seconds]');

  startButton.disabled = true;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
        iziToast.error({
          title: 'Error',
          message: '❌Please choose a date in the future',
          position: 'topRight',
          class: 'izitoast-error',
          icon: '',
          iconText: '',
        });
        startButton.disabled = true;
      } else {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
      }
    },
  };

  flatpickr('#datetime-picker', options);

  startButton.addEventListener('click', () => {
    if (!userSelectedDate) {
      return;
    }

    dateTimePicker.disabled = true;
    startButton.disabled = true;

    const intervalId = setInterval(() => {
      const now = new Date();
      const timeLeft = userSelectedDate - now;

      if (timeLeft <= 0) {
        console.log('Time is up');
        clearInterval(intervalId);
        updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        dateTimePicker.disabled = false;
        return;
      }

      const timeComponents = convertMs(timeLeft);
      updateTimerDisplay(timeComponents);
    }, 1000);
  });

  function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
});
