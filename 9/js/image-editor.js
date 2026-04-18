const SliderInfo = {
  'chrome': {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'sepia': {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'marvin': {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%',
  },
  'phobos': {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px',
  },
  'heat': {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const form = document.querySelector('.img-upload__form');
const smallbtn = form.querySelector('.scale__control--smaller');
const bigbtn = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const imgPreview = form.querySelector('.img-upload__preview').querySelector('img');

const sliderElement = form.querySelector('.effect-level__slider');
const sliderContainer = form.querySelector('.effect-level');
const sliderValue = form.querySelector('.effect-level__value');
const effectsContainer = form.querySelector('.effects__list');
sliderContainer.classList.add('hidden');

const smallBtnClickHandler = () => {
  if (scaleValue.value === '25%') {
    return;
  }
  const newValue = Number(scaleValue.value.slice(0, -1)) - 25;
  scaleValue.value = `${newValue}%`;
  imgPreview.style.transform = `scale(${newValue / 100})`;
};

const bigBtnClickHandler = () => {
  if (scaleValue.value === '100%') {
    return;
  }
  const newValue = Number(scaleValue.value.slice(0, -1)) + 25;
  scaleValue.value = `${newValue}%`;
  imgPreview.style.transform = `scale(${newValue / 100})`;
};

smallbtn.addEventListener('click', smallBtnClickHandler);
bigbtn.addEventListener('click', bigBtnClickHandler);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


sliderElement.noUiSlider.on('update', () => {
  sliderValue.value = sliderElement.noUiSlider.get();
  imgPreview.style.filter = imgPreview.style.filter.replace(/(\d+(\.\d+)?)/, sliderValue.value);
});

effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    imgPreview.style.filter = 'none';
    sliderContainer.classList.add('hidden');
    return;
  }
  const style = SliderInfo[evt.target.value];
  imgPreview.style.filter = `${style.effect}(${style.max}${style.units ?? ''})`;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: style.min,
      max: style.max,
    },
    step: style.step,
  });
  sliderElement.noUiSlider.set(style.max);
  sliderContainer.classList.remove('hidden');
});

