import { isEscapeKey } from './util.js';
import { pristine } from './validator.js';
import { sendData } from './api.js';
import './image-editor.js';
import { createNotification } from './notification.js';

const SendButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикация...',
};

const body = document.body;
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const sendButton = form.querySelector('.img-upload__submit');
const image = form.querySelector('.img-upload__preview').querySelector('img');
const sliderContainer = form.querySelector('.effect-level');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  image.style = '';
  pristine.reset();
  document.removeEventListener('keydown', documentKeydownHandler);
};

function documentKeydownHandler(evt) {
  if (evt.target.closest('.img-upload__field-wrapper')) {
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeForm();
};

const imgUploadHandler = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  sliderContainer.classList.add('hidden');
};

const onSuccess = () => {
  createNotification(successTemplate, closeForm);
};
const onError = () => {
  createNotification(errorTemplate);
};

const disableButton = () => {
  sendButton.disabled = true;
  sendButton.textContent = SendButtonText.SENDING;
};
const enableButton = () => {
  sendButton.disabled = false;
  sendButton.textContent = SendButtonText.DEFAULT;
};

const sendFormData = async (formElement) => {
  if (pristine.validate()) {
    const formData = new FormData(formElement);
    disableButton();
    try {
      await sendData(formData);
      onSuccess();
    }catch (error) {
      onError();
    } finally {
      enableButton();
    }
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

form.querySelector('.img-upload__input').addEventListener('change', imgUploadHandler);

form.addEventListener('submit', formSubmitHandler);

form.querySelector('.img-upload__cancel').addEventListener('click', closeButtonClickHandler);


