const REMOVE_MESSAGE_TIMEOUT = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.body;

const showErrorMessage = () => {
  const error = errorTemplate.cloneNode(true);
  body.append(error);
  setTimeout(() => error.remove(), REMOVE_MESSAGE_TIMEOUT);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, showErrorMessage, debounce };
