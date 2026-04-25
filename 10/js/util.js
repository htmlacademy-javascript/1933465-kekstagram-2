const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomValue = (value) => value[getRandomNumber(0, value.length - 1)];
const createCounter = () => {
  let id = 1;
  const get = () => id;
  const next = () => id++;
  return {
    get,
    next
  };
};
const isEscapeKey = (evt) => evt.key === 'Escape';
const REMOVE_MESSAGE_TIMEOUT = 5000;
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(() => errorElement.remove(), REMOVE_MESSAGE_TIMEOUT);
};

export {getRandomNumber, getRandomValue, createCounter, isEscapeKey, showErrorMessage};
