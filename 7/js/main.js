import { createPhotos } from './data.js';
import { renderPictures } from './pictures-renderer.js';
import { addEventListeners } from './popup.js';
import { Gallery } from './gallery.js';

const gallery = new Gallery(createPhotos);
renderPictures(gallery);
addEventListeners(gallery);
