import { getRandomNumber, getRandomValue, createCounter } from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Невада Александр Маск',
  'Гриффин Маск',
  'Вивиан Дженна Уилсон',
  'Кай Маск',
  'Саксон Маск',
  'Дэмиан Маск',
  'Экс Эш Эй-Твелв',
  'Экза Дарк Сайдириэль',
  'Тау Техно Механикус',
  'Страйдер',
  'Азур',
  'Аркадия',
  'Селдон Ликург',
];

const DESCRIPTION_PARTS = {
  adjectives: ['толстый', 'рыжий', 'вороватый', 'смешной'],
  subjects: ['кот', 'слон', 'кiт', 'пес'],
  verbs: ['стоит', 'лежит', 'сидит', 'прыгает'],
  prepositions: ['под', 'перед', 'за'],
  nouns: ['столом', 'машиной', 'водопадом'],
};

const PHOTOS_COUNT = 25;
const Likes = {
  MIN: 15,
  MAX: 200
};
const Comments = {
  MIN: 0,
  MAX: 30
};
const Avatar = {
  MIN: 1,
  MAX: 6
};

const photoId = createCounter();
const getPhotoUrl = (id) => `photos/${id}.jpg`;
const getDescription = ({ adjectives, subjects, verbs, prepositions, nouns }) => {
  const getAdjective = () => getRandomValue(adjectives);
  const getSubject = () => getRandomValue(subjects);
  const getVerb = () => getRandomValue(verbs);
  const getReposition = () => getRandomValue(prepositions);
  const getNoun = () => getRandomValue(nouns);
  return `${getAdjective()} ${getSubject()} ${getVerb()} ${getReposition()} ${getNoun()}`;
};

const getCommentId = (index) => photoId.get().toString() + index.toString().padStart(3, '0');
const getAvatar = () => `img/avatar-${getRandomNumber(Avatar.MIN, Avatar.MAX)}.svg`;
const getComment = (v, index) => ({
  id: getCommentId(index),
  avatar: getAvatar(),
  message: getRandomValue(MESSAGES),
  name: getRandomValue(NAMES),
});

const createComments = () => Array.from({ length: getRandomNumber(Comments.MIN, Comments.MAX) }, getComment);
const createPhoto = () => {
  photoId.next();
  const id = photoId.get();
  return ({
    id: id,
    url: getPhotoUrl(id),
    description: getDescription(DESCRIPTION_PARTS),
    likes: getRandomNumber(Likes.MIN, Likes.MAX),
    comments: createComments(),
  });
};

export const createPhotos = () => Array.from({ length: PHOTOS_COUNT }, createPhoto);

