import { isEscapeKey } from './util.js';
import { pristine } from './validator.js';
import './image-editor.js';

const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const image = form.querySelector('.img-upload__preview').querySelector('img');
const sliderContainer = form.querySelector('.effect-level');


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

form.querySelector('.img-upload__input').addEventListener('change', imgUploadHandler);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

form.querySelector('.img-upload__cancel').addEventListener('click', closeButtonClickHandler);
