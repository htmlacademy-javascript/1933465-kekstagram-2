const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const REGEX = /^#[a-zа-яё0-9]+$/i;
const VALIDATIONS = [
  {
    callback: (value) => value.some((hash) => !hash.startsWith('#')),
    errorMessage: 'Хэштеги должны начинаться с символа \'#\'',
  },
  {
    callback: (value) => value.some((hash) => hash.length === 1),
    errorMessage: 'Хэштеги не должны состоять из одного символа \'#\'',
  },
  {
    callback: (value) => value.some((hash) => !REGEX.test(hash)),
    errorMessage: 'Хэштеги должны содержать только буквы и цифры',
  },
  {
    callback: (value) => value.some((hash) => hash.length > MAX_HASHTAG_LENGTH),
    errorMessage: `Длина хэштега не должна превышать ${MAX_HASHTAG_LENGTH} символов`,
  },
  {
    callback: (value) => new Set(value).size !== value.length,
    errorMessage: 'Хэштеги не должны повторяться',
  },
  {
    callback: (value) => value.length > MAX_HASHTAGS,
    errorMessage: `Количество хэштегов не должно превышать ${MAX_HASHTAGS}`,
  },
];

const form = document.querySelector('.img-upload__form');

let errorMessage = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateDescription = (value) => !(value.length > MAX_DESCRIPTION_LENGTH);

const validateHashes = (value) => {
  if (value.trim().length === 0) {
    return true;
  }
  const hashes = value.trim().split(/\s+/).map((hash) => hash.toLowerCase());
  return !VALIDATIONS.some((validation) => {
    if (validation.callback(hashes)) {
      errorMessage = validation.errorMessage;
      return true;
    }
  });
};

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashes,
  () => errorMessage
);

pristine.addValidator(
  form.querySelector('.text__description'),
  validateDescription,
  `Описание должно быть меньше ${MAX_DESCRIPTION_LENGTH} символов`
);

export { pristine };
