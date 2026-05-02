const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
let picturesFragment;
const createPictureElement = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');
  img.src = photo.src;
  img.alt = photo.alt;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.dataset.id = photo.id;
  return pictureElement;
};

const createPictures = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    fragment.appendChild(pictureElement);
  });
  return fragment;
};

const clearPictures = () => {
  pictureContainer.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const renderPictures = (gallery, filter = null) => {
  clearPictures();
  let pictures = gallery.getPictures();
  if (filter) {
    pictures = filter(pictures);
  }
  picturesFragment = createPictures(pictures);
  pictureContainer.appendChild(picturesFragment);
};

export { renderPictures };
