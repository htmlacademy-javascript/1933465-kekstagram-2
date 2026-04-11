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

const transformTimeToMinutes = (time) => time.split(':').map((item) => parseInt(item, 10)).reduce((acc, item) => acc * 60 + item);

const isMeetingValid = (workStart, workEnd, meetStart, meetDuration) => {
  const workStartInMinutes = transformTimeToMinutes(workStart);
  const workEndInMinutes = transformTimeToMinutes(workEnd);
  const meetStartInMinutes = transformTimeToMinutes(meetStart);
  const meetEndInMinutes = meetStartInMinutes + meetDuration;
  return workStartInMinutes <= meetStartInMinutes && meetEndInMinutes <= workEndInMinutes;
};

window.console.log(isMeetingValid('08:00', '17:30', '14:00', 90));
window.console.log(isMeetingValid('8:0', '10:0', '8:0', 120));
window.console.log(isMeetingValid('08:00', '14:30', '14:00', 90));
window.console.log(isMeetingValid('14:00', '17:30', '08:0', 90));
window.console.log(isMeetingValid('8:00', '17:30', '08:00', 900));
