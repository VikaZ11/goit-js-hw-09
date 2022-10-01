import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerRef = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', '');

const timer = {
  intervalId: null,
  refs: {},
  notifyOptions: {
    position: 'center-center',
    backOverlay: true,
    clickToClose: true,
    closeButton: true,
  },

  start(rootSelector, deadline) {
    Notify.success('Відлік почався!', this.notifyOptions);
    this.getRefs(rootSelector);
    this.intervalId = setInterval(() => {
      const ms = deadline.getTime() - Date.now();

      if (ms <= 1000) {
        clearInterval(this.intervalId);
        Notify.success('Дедлайн настав!', this.notifyOptions);
      }
      const data = this.convertMs(ms);

      Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.addLeadinZero(value);
      });
    }, 1000);
  },

  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('[data-days]');
    this.refs.hours = rootSelector.querySelector('[data-hours]');
    this.refs.minutes = rootSelector.querySelector('[data-minutes]');
    this.refs.seconds = rootSelector.querySelector('[data-seconds]');
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
  addLeadinZero(value) {
    return String(value).padStart(2, '0');
  },
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const delta = selectedDates[0].getTime() - Date.now();

    if (delta <= 0) {
      Notify.failure('Вибраний час в минулому.', this.notifyOptions);
      return;
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', onStartBtnClick);
    }

    function onStartBtnClick() {
      timer.start(timerRef, selectedDates[0]);
    }
  },
});