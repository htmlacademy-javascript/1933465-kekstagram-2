import { renderPictures } from './pictures-renderer.js';
import { debounce } from './util.js';

const RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;
const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const Filters = {
  'filter-default': null,
  'filter-random': (elements) => elements.toSorted(() => Math.random() - 0.5).slice(0, RANDOM_COUNT),
  'filter-discussed': (elements) => elements.toSorted((a, b) => b.comments - a.comments),
};
const debouncedRenderPictures = debounce(renderPictures, RERENDER_DELAY);

const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');
const buttons = filtersForm.querySelectorAll('.img-filters__button');

const buttonClickHandler = (evt, gallery) => {
  evt.preventDefault();
  const targetButton = evt.target;
  const activeButton = filtersForm.querySelector(`.${BUTTON_ACTIVE_CLASS}`);
  if(targetButton === activeButton) {
    return;
  }
  activeButton.classList.remove(BUTTON_ACTIVE_CLASS);
  targetButton.classList.add(BUTTON_ACTIVE_CLASS);
  const filter = Filters[targetButton.id];
  debouncedRenderPictures(gallery, filter);
};

const buttonsAttachHandlers = (gallery) => {
  buttons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      buttonClickHandler(evt, gallery);
    });
  });
};
const showFilters = (gallery) => {
  filters.classList.remove('img-filters--inactive');
  buttonsAttachHandlers(gallery);
};

export { showFilters, buttonsAttachHandlers };
