import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

const formData = {};

const onFormInput = e => {
  const { name, value } = e.target;
  formData[name] = value;
}
formRef.addEventListener('input', onFormInput)


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  } )
}

function onSuccess(value) { Notify.success(value) };
function onError(error) { Notify.failure(error) };

const onFormSubmit = (e) => {
  e.preventDefault();
  for (let i = 0, delay = +formData.delay;
          i < formData.amount;
          i += 1, delay += +formData.step) {
    const position = i + 1;

    createPromise(position, delay).then(onSuccess).catch(onError);
  }

  formRef.reset();
}

formRef.addEventListener('submit', onFormSubmit);

