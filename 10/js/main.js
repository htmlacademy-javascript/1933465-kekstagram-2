// import { createPhotos } from './data.js';
import { renderPictures } from './pictures-renderer.js';
import { Popup } from './popup.js';
import { Gallery } from './gallery.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';
import './form.js';

try {
  const data = await getData();
  const gallery = new Gallery(data);
  renderPictures(gallery);
  new Popup(gallery);
} catch (error) {
  showErrorMessage();
}


