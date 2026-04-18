import { isEscapeKey } from './util.js';
import { pristine } from './validator.js';

const form = document.querySelector('.img-upload__form');

const closeForm = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  form.reset();
  form.querySelector('.img-upload__preview').querySelector('img').style.transform = '';
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
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
};

form.querySelector('.img-upload__input').addEventListener('change', imgUploadHandler);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

form.querySelector('.img-upload__cancel').addEventListener('click', closeButtonClickHandler);
