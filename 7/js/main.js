import { createPhotos } from './data.js';
import { renderPictures } from './pictures-renderer.js';
import { Popup } from './popup.js';
import { Gallery } from './gallery.js';

const gallery = new Gallery(createPhotos);
renderPictures(gallery);
const popup = new Popup(gallery);
popup.attachHandlers();
