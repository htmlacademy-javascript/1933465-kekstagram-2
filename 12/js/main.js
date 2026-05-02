import { renderPictures } from './pictures-renderer.js';
import { Popup } from './popup.js';
import { Gallery } from './gallery.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';
import { showFilters } from './filters.js';
import './form.js';

try {
  const photos = await getData();
  const gallery = new Gallery(photos);
  showFilters(gallery, renderPictures);
  renderPictures(gallery);
  new Popup(gallery);
} catch (error) {
  showErrorMessage();
}


