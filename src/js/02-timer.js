import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
}



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
          onDisableStartBtn();
          Notify.failure("Please choose a date in the future", {
              position: 'center-center',
              backOverlay: true,
              clickToClose: true,
              closeButton: true,
          });
      }else {onEnableStartBtn();}
            
  },
};
flatpickr(refs.input, options);


const onEnableStartBtn = () => refs.startBtn.disabled = false;
const onDisableStartBtn = () => refs.startBtn.disabled = true;
const onEnableInput = () => refs.input.disabled = false;
const onDisableInput = () => refs.input.disabled = true;

onDisableStartBtn();


const timer = {
    intervalId: null,
    refs: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
},
    start() {
        const startTime = this.getStartTime();
        this.intervalId = setInterval(() => {
            const delta = startTime - Date.now();
            const data = this.convertMs(delta);
            

            Object.entries(data).forEach(([name, value]) => {
                this.refs[name].textContent = this.addLeadingZero(value);
            });

            if (delta < 1000) {
                clearInterval(this.intervalId)
                onEnableInput();
            }
        }, 1000);
        
        onDisableStartBtn();
        onDisableInput();
    },

    getStartTime() {
        let date = new Date(refs.input.value);
        const onDateInput = () => {
            date = new Date(refs.input.value);
        }
        refs.input.addEventListener('input', onDateInput)
        return date.getTime();
    },
    

    convertMs(ms) {
        const days = Math.floor(ms / (((1000 * 60) * 60) * 24));
        const hours = Math.floor((ms % (((1000 * 60) * 60) * 24)) / ((1000 * 60) * 60));
        const minutes = Math.floor(((ms % (((1000 * 60) * 60) * 24)) % ((1000 * 60) * 60)) / (1000 * 60));
        const seconds = Math.floor((((ms % (((1000 * 60) * 60) * 24)) % ((1000 * 60) * 60)) % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    },

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
}

refs.startBtn.addEventListener('click', timer.start.bind(timer));





