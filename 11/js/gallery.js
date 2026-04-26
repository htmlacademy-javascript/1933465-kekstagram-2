class Gallery {
  constructor(data) {
    this.items = data;
  }

  getPictures() {
    return this.items.map((item) => ({
      id: item.id,
      src: item.url,
      alt: item.description,
      comments: item.comments.length,
      likes: item.likes
    }));
  }

  getFullPhotoById(id) {
    return this.items.find((item) => item.id === id);
  }
}

export { Gallery };
