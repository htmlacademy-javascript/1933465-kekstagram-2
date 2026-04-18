
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

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

const renderPictures = (gallery) => {
  const fragment = createPictures(gallery.getPictures());
  pictureContainer.appendChild(fragment);
};

export { renderPictures };
