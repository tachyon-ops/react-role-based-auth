function get2Chars(str = '') {
  return str.slice(0, 2).toUpperCase();
}

function twoDigits(str: string) {
  return `${str.length < 2 ? '0' : ''}${str}`;
}

const formatDate = (date: Date | null) => {
  if (date === null) return '';
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let hour = (date.getHours() + 1).toString();
  let minutes = (date.getMinutes() + 1).toString();
  let seconds = (date.getSeconds() + 1).toString();

  const year = date.getFullYear();

  const dateTime = [year, twoDigits(month), twoDigits(day)].join('-');
  const clockTime = `${twoDigits(hour)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
  return `${dateTime} ${clockTime}`;
};

export const Utils = {
  get2Chars,
  formatDate,
};
