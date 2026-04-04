const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
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

const descriptionParts = {
  adjectives: ['толстый', 'рыжий', 'вороватый', 'смешной'],
  subjects: ['кот', 'слон', 'кiт', 'пес'],
  verbs: ['стоит', 'лежит', 'сидит', 'прыгает'],
  prepositions: ['под', 'перед', 'за'],
  nouns: ['столом', 'машиной', 'водопадом'],
};

const PHOTOS_COUNT = 25;
const likes = {
  MIN: 15,
  MAX: 200
};
const comments = {
  MIN: 0,
  MAX: 30
};
const avatar = {
  MIN: 1,
  MAX: 6
};


const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const createRandomNumberGenerator = (min, max) => () => getRandomNumber(min, max);
const getRandomValue = (value) => value[getRandomNumber(0, value.length - 1)];
const createCounter = () => {
  let id = 1;
  return () => id++;
};

const getPhotoId = createCounter();
const getUrlId = createCounter();
const getPhotoUrl = () => `photos/${getUrlId()}.jpg`;
const createDescription = ({ adjectives, subjects, verbs, prepositions, nouns }) => {
  const getAdjective = () => getRandomValue(adjectives);
  const getSubject = () => getRandomValue(subjects);
  const getVerb = () => getRandomValue(verbs);
  const getReposition = () => getRandomValue(prepositions);
  const getNoun = () => getRandomValue(nouns);
  return () => `${getAdjective()} ${getSubject()} ${getVerb()} ${getReposition()} ${getNoun()}`;
};
const getDescription = createDescription(descriptionParts);
const getLikes = createRandomNumberGenerator(likes.MIN, likes.MAX);

const getCommentsCount = createRandomNumberGenerator(comments.MIN, comments.MAX);
const getUniqueId = () => {
  const ids = [];
  return () => {
    let id;
    do {
      id = getRandomNumber(1, Number.MAX_SAFE_INTEGER);
    } while (ids.includes(id));
    ids.push(id);
    return id;
  };
};
const getCommentId = getUniqueId();
const getAvatar = () => `img/avatar-${getRandomNumber(avatar.MIN, avatar.MAX)}.svg`;

const getComment = () => ({
  id: getCommentId(),
  avatar: getAvatar(),
  message: getRandomValue(messages),
  name: getRandomValue(names),
});
const createComments = () => Array.from({ length: getCommentsCount() }, getComment);

const createPhoto = () => ({
  id: getPhotoId(),
  url: getPhotoUrl(),
  desription: getDescription(),
  likes: getLikes(),
  comments: createComments(),
});
const photos = Array.from({ length: PHOTOS_COUNT }, createPhoto);

window.console.log(photos);
