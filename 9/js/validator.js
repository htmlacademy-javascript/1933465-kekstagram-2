const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: '.img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashes = (value) => {
  if (value.trim().length === 0) {
    return true;
  }
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;
  return value.split(' ').every((hash) => regex.test(hash));
};
const validateUniqueHashes = (value) => {
  const normalizedHash = value.trim().split(' ').map((hash) => hash.toLowerCase());
  return normalizedHash.length === new Set(normalizedHash).size;
};
const validateNumberOfHeshes = (value) => value.trim().split(' ').length <= 5;
const validateDescription = (value) => value.length <= 140;


pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashes,
  'Хэштеги должен быть в формате #тэг'
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateUniqueHashes,
  'Хэштеги должны быть уникальными'
);

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateNumberOfHeshes,
  'Максимум 5 хэштегов'
);

pristine.addValidator(
  form.querySelector('.text__description'),
  validateDescription,
  'Описание должно быть меньше 140 символов'
);

export { pristine };
