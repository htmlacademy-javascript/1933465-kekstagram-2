const SCALE_STEP = 25;
const ScaleBorders = {
  MIN: 25,
  MAX: 100,
};
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
const smallBtn = form.querySelector('.scale__control--smaller');
const bigBtn = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const imgPreview = form.querySelector('.img-upload__preview').querySelector('img');

const sliderContainer = form.querySelector('.effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const sliderValue = sliderContainer.querySelector('.effect-level__value');
const effectsContainer = form.querySelector('.effects');
let currentScale = 100;
let currentEffect = 'none';
let currentStyle = 'none';
sliderContainer.classList.add('hidden');

const editorReset = () => {
  currentScale = 100;
  imgPreview.style = '';
  imgPreview.src = '';
};

const updateScale = (modifier) => {
  const newScale = currentScale + modifier * SCALE_STEP;
  if (newScale < ScaleBorders.MIN || newScale > ScaleBorders.MAX) {
    return;
  }
  currentScale = newScale;
  scaleValue.value = `${currentScale}%`;
  imgPreview.style.transform = `scale(${currentScale / 100})`;
};

const smallBtnClickHandler = () => {
  updateScale(-1);
};
const bigBtnClickHandler = () => {
  updateScale(1);
};

smallBtn.addEventListener('click', smallBtnClickHandler);
bigBtn.addEventListener('click', bigBtnClickHandler);

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

slider.noUiSlider.on('update', () => {
  if (currentEffect !== 'none') {
    sliderValue.value = slider.noUiSlider.get();
    imgPreview.style.filter = `${currentStyle.effect}(${sliderValue.value}${currentStyle.units ?? ''})`;
  }
});

effectsContainer.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  if (currentEffect === 'none') {
    imgPreview.style.filter = 'none';
    sliderContainer.classList.add('hidden');
    return;
  }
  currentStyle = SliderInfo[currentEffect];
  slider.noUiSlider.updateOptions({
    range: {
      min: currentStyle.min,
      max: currentStyle.max,
    },
    step: currentStyle.step,
  });
  slider.noUiSlider.set(currentStyle.max);
  sliderContainer.classList.remove('hidden');
});

export { editorReset };
