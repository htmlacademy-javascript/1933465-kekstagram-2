const REMOVE_MESSAGE_TIMEOUT = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(() => errorElement.remove(), REMOVE_MESSAGE_TIMEOUT);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    console.log(timeoutId);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    console.log(timeoutId);

  };
}

export { isEscapeKey, showErrorMessage, debounce };
