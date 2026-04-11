import {createPhotos} from './data.js';
import { renderPictures } from './pictures-renderer.js';

const photos = createPhotos();
renderPictures(photos);
window.console.log(photos);

