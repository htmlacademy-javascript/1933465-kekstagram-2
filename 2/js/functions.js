const validateLength = (text, maxLength) => {
  if (text.length > maxLength) {
    return false;
  }
  return true;
};

const isPalindrome = (text) => {
  const normalizedText = text.toLowerCase().replaceAll(' ', '');
  const reversedText = normalizedText.split('').reverse().join('');
  return normalizedText === reversedText;
};

const extractDigits = (text) => {
  if (typeof text === 'number') {
    text = text.toString();
  }
  return parseInt(text.replace(/\D+/g, ''), 10);
};


console.warn('Проверка первой функции');
console.log(validateLength('проверяемая строка', 20));
console.log(validateLength('проверяемая строка', 18));
console.log(validateLength('проверяемая строка', 10));

console.warn('Проверка второй функции');
console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

console.warn('Проверка третей функции');
console.log(extractDigits('2023 год'));
console.log(extractDigits('ECMAScript 2022'));
console.log(extractDigits('1 кефир, 0.5 батона'));
console.log(extractDigits('агент 007'));
console.log(extractDigits('а я томат'));
console.log(extractDigits(2023));
console.log(extractDigits(-1));
console.log(extractDigits(1.5));

