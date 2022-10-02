import { Notify } from "notiflix";

const formRef = document.querySelector('.form');
const btnRef = formRef.querySelector('button');

formRef.addEventListener('submit', onBtnClick);

function onBtnClick(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let delayN = Number(delay.value);
  const stepN = Number(step.value);
  const amountN = Number(amount.value);


  for (let i = 1; i <= amountN; i += 1) {
    createPromise(i, delayN).then(result => {
      Notify.success(result)
    }).catch(result => {
      Notify.failure(result)
    })

    delayN += stepN;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
