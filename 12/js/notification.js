import { isEscapeKey } from './util.js';

const body = document.body;

const closeNotification = (evt) => {
  evt.stopPropagation();
  const notification = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = notification.querySelector('.success__button') || notification.querySelector('.error__button');
  if (evt.target === notification || evt.target === closeButton || isEscapeKey(evt)) {
    notification.remove();
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
