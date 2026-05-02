const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
let picturesFragment;
const createPicture = (photo) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = photo.src;
  img.alt = photo.alt;
  picture.querySelector('.picture__comments').textContent = photo.comments;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.dataset.id = photo.id;
  return picture;
};

const createPictures = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picture = createPicture(photo);
    fragment.appendChild(picture);
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
