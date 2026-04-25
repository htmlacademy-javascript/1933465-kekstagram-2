import { isEscapeKey } from './util.js';

class Popup {
  constructor(gallery) {
    this.gallery = gallery;
    this.picturesContainer = document.querySelector('.pictures');
    this.body = document.body;
    this.popup = document.querySelector('.big-picture');
    this.img = this.popup.querySelector('.big-picture__img').querySelector('img');
    this.likesCount = this.popup.querySelector('.likes-count');
    this.totalCommentsCount = this.popup.querySelector('.social__comment-total-count');
    this.commentsShownCount = this.popup.querySelector('.social__comment-shown-count');
    this.caption = this.popup.querySelector('.social__caption');
    this.commentsContainer = this.popup.querySelector('.social__comments');
    this.commentsLoader = this.popup.querySelector('.social__comments-loader');
    this.closeButton = this.popup.querySelector('.big-picture__cancel');
    this.commentsCount = 0;
    this.photo = {};
    this.attachHandlers();
  }

  comments = [];

  createComment = (comment) => `<li class="social__comment"><img class="social__picture" alt="${comment.name}" src="${comment.avatar}"><p class="social__text">${comment.message}</p></li>`;

  addComments = () => {
    this.commentsContainer.insertAdjacentHTML(
      'beforeend',
      this.comments.slice(this.commentsCount, this.commentsCount + 5)
        .reduce((acc, comment) => {
          acc += this.createComment(comment);
          return acc;
        }, '')
    );
    this.commentsCount += 5;
    if (this.commentsCount >= this.comments.length) {
      this.commentsLoader.classList.add('hidden');
      this.commentsCount = this.comments.length;
    }
    this.commentsShownCount.textContent = this.commentsCount;
  };

  fill = () => {
    this.img.src = this.photo.url;
    this.img.alt = this.photo.description;
    this.likesCount.textContent = this.photo.likes;
    this.totalCommentsCount.textContent = this.photo.comments.length;
    this.caption.textContent = this.photo.description;
    this.commentsLoader.classList.remove('hidden');
    this.commentsContainer.innerHTML = '';
    this.addComments();
  };

  open = () => {
    document.addEventListener('keydown', this.documentKeydownHandler.bind(this));
    this.popup.classList.remove('hidden');
    this.body.classList.add('modal-open');
  };

  close = () => {
    this.popup.classList.add('hidden');
    this.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.documentKeydownHandler);
  };

  picturesContainerClickHandler(evt) {
    const picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      this.photo = this.gallery.getFullPhotoById(parseInt(picture.dataset.id, 10));
      this.commentsCount = 0;
      this.comments = this.photo.comments;
      this.fill();
      this.open();
    }
  }

  documentKeydownHandler(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.close();
    }
  }

  closeButtonClickHandler(evt) {
    evt.preventDefault();
    this.close();
  }

  commentsLoaderClickHandler() {
    this.addComments();
  }

  attachHandlers() {
    this.picturesContainer.addEventListener('click', this.picturesContainerClickHandler.bind(this));
    this.closeButton.addEventListener('click', this.closeButtonClickHandler.bind(this));
    this.commentsLoader.addEventListener('click', this.commentsLoaderClickHandler.bind(this));
  }
}

export { Popup };
