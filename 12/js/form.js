import { isEscapeKey } from './util.js';
import { pristine } from './validator.js';
import { sendData } from './api.js';
import { createNotification } from './notification.js';
import { editorReset } from './image-editor.js';

const FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const SendButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикация...',
};

const body = document.body;
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const sendButton = form.querySelector('.img-upload__submit');
const sliderContainer = form.querySelector('.effect-level');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const uploadPreview = form.querySelector('.img-upload__preview').querySelector('img');
const uploadPreviewEffects = form.querySelectorAll('.effects__preview');

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.reset();
  editorReset();
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

const updatePreview = (target) => {
  const file = target.files[0];
  if (FILE_TYPES.includes(file.type)) {
    const url = URL.createObjectURL(file);
    uploadPreview.src = url;

    uploadPreviewEffects.forEach((element) => {
      element.style.backgroundImage = `url(${url})`;
    });
  }
};

const imgUploadChangeHandler = (evt) => {
  updatePreview(evt.target);
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

const toggleButtonState = (state) => {
  sendButton.disabled = state;
  sendButton.textContent = state ? SendButtonText.SENDING : SendButtonText.DEFAULT;
};

const sendFormData = async (formElement) => {
  if (pristine.validate()) {
    const formData = new FormData(formElement);
    toggleButtonState(true);
    try {
      await sendData(formData);
      onSuccess();
    } catch (error) {
      onError();
    } finally {
      toggleButtonState(false);
    }
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

form.querySelector('.img-upload__input').addEventListener('change', imgUploadChangeHandler);

form.addEventListener('submit', formSubmitHandler);

form.querySelector('.img-upload__cancel').addEventListener('click', closeButtonClickHandler);


