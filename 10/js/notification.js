import { isEscapeKey } from './util.js';

const body = document.body;

const closeNotification = (evt) => {
  evt.stopPropagation();
  const element = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = element.querySelector('.success__button') || element.querySelector('.error__button');
  if (evt.target === element || evt.target === closeButton || isEscapeKey(evt)) {
    element.remove();
    body.removeEventListener('click', bodyClickHandler);
    body.removeEventListener('keydown', bodyKeydownHandler);
  }
};

function bodyClickHandler (evt) {
  closeNotification(evt);
}

function bodyKeydownHandler (evt) {
  closeNotification(evt);
}

const createNotification = (template, trigger = null) => {
  trigger?.();
  const notification = template.content.cloneNode(true);
  body.append(notification);
  body.addEventListener('click', bodyClickHandler);
  body.addEventListener('keydown', bodyKeydownHandler);
};

export { createNotification };
