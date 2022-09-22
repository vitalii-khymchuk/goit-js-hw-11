import throttle from 'lodash.throttle';

let innerCallback = {};

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 2;
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    innerCallback();
  }
}

const throttled = throttle(checkPosition, 300);

export function addInfScroll(externalCallback) {
  innerCallback = externalCallback;
  document.addEventListener('scroll', throttled);
  console.log(`Infinite scroll enabled`);
}

export function removeInfScroll() {
  document.removeEventListener('scroll', throttled);
  console.log(`Infinite scroll disabled`);
}

//Щоб безкінечний скрол запрацював прорібно викликати addInfScroll і передати функцію яка буде викликатися при
//досягленні порога. Щоб функція перестала викликатися, виклликаєм removeInfScroll.
