import { isEscapeKey } from './util.js';

const picturesCiontainer = document.querySelector('.pictures');
const body = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const commentsContainer = popup.querySelector('.social__comments');
const closeButton = popup.querySelector('.big-picture__cancel');
let addCommentsHandler = () => { };

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  const imgElement = document.createElement('img');
  const textElement = document.createElement('p');
  commentElement.classList.add('social__comment');
  imgElement.classList.add('social__picture');
  textElement.classList.add('social__text');
  imgElement.alt = comment.name;
  imgElement.src = comment.avatar;
  textElement.textContent = comment.message;
  commentElement.appendChild(imgElement);
  commentElement.appendChild(textElement);
  return commentElement;
};

const commentsLoader = (commentsArray) => {
  const comments = commentsArray;
  let commentsCount = 0;
  return () => {
    const commentsFragment = document.createDocumentFragment();
    comments.slice(commentsCount, commentsCount + 5).forEach((comment) => {
      commentsFragment.appendChild(createComment(comment));
    });
    commentsContainer.appendChild(commentsFragment);
    commentsCount += 5;
    if (commentsCount >= comments.length) {
      popup.querySelector('.social__comments-loader').classList.add('hidden');
      commentsCount = comments.length;
    }
    popup.querySelector('.social__comment-shown-count').textContent = commentsCount;
  };
};

const fullfillPopup = (photo) => {
  const img = popup.querySelector('.big-picture__img').querySelector('img');
  img.src = photo.url;
  img.alt = photo.description;
  popup.querySelector('.likes-count').textContent = photo.likes;
  popup.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.social__comments-loader').classList.remove('hidden');
  commentsContainer.innerHTML = '';
  addCommentsHandler = commentsLoader(photo.comments);
  addCommentsHandler();
  popup.querySelector('.social__comments-loader').addEventListener('click', addCommentsHandler);
};

const clearPopup = () => {
  const img = popup.querySelector('.big-picture__img').querySelector('img');
  img.src = '';
  img.alt = '';
  popup.querySelector('.likes-count').textContent = '';
  popup.querySelector('.social__comment-total-count').textContent = '';
  popup.querySelector('.social__caption').textContent = '';
  popup.querySelector('.social__comments-loader').removeEventListener('click', addCommentsHandler);
};

const openPopupHandler = (evt, gallery) => {
  const picture = evt.target.closest('.picture');
  if (picture) {
    evt.preventDefault();
    fullfillPopup(gallery.getFullPhotoById(parseInt(picture.dataset.id, 10)));
    popup.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', closePopupByEscapeHandler);
  }
};

const closePopupHandler = (evt) => {
  evt.preventDefault();
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closePopupByEscapeHandler);
  clearPopup();
};

function closePopupByEscapeHandler(evt) {
  if (isEscapeKey(evt)) {
    closePopupHandler(evt);
  }
}

const addEventListeners = (gallery) => {
  picturesCiontainer.addEventListener('click', (evt) => openPopupHandler(evt, gallery));
  closeButton.addEventListener('click', closePopupHandler);
};

export { addEventListeners };
