const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onStartClick = () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
};

const onStopClick = () => {
  clearInterval(timerId);

  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled')
};
startBtn.addEventListener('click', onStartClick);

stopBtn.addEventListener('click', onStopClick);

