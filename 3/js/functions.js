const validateLength = (text, maxLength) => text.length <= maxLength;

const isPalindrome = (text) => {
  const normalizedText = text.toLowerCase().replaceAll(' ', '');
  const reversedText = normalizedText.split('').reverse().join('');
  return normalizedText === reversedText;
};

const extractDigits = (text) => {
  let tmpText = text;
  if (typeof text === 'number') {
    tmpText = text.toString();
  }
  return parseInt(tmpText.replace(/\D+/g, ''), 10);
};

