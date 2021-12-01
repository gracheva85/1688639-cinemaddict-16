import dayjs from 'dayjs';

const getDate = (someDate, format) => dayjs(someDate).format(format);

const changeWord = (array, word) => array.length === 1 ? word : `${word}s`;

const addClassBySubmit = (submit, className) => submit ? className : '';

const  getFirstToUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {getDate, changeWord, addClassBySubmit, getFirstToUpperCase};
