
const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}
let timerId = null;

onDisableBtn(refs.stopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function onDisableBtn(btn) {
    btn.disabled = true;
}
function onEnableBtn(btn) {
    btn.disabled = false;
}

const onChangeBgColorOfBody = () => {
    refs.body.style.backgroundColor = getRandomHexColor();
}
const onStartBtnClick = () => {
    onChangeBgColorOfBody();
    timerId = setInterval(onChangeBgColorOfBody, 1000);

    onDisableBtn(refs.startBtn);
    onEnableBtn(refs.stopBtn);
}
const onStopBtnClick = () => { 
    clearInterval(timerId);
    
    onDisableBtn(refs.stopBtn);
    onEnableBtn(refs.startBtn);
}


refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);