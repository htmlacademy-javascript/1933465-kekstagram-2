const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomValue = (value) => value[getRandomNumber(0, value.length - 1)];
const createCounter = () => {
  let id = 1;
  const get = () => id;
  const next = () => id++;
  return {
    get,
    next
  };
};

export {getRandomNumber, getRandomValue, createCounter};
