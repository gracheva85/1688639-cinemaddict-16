import dayjs from 'dayjs';
import AbstractView from '../view/abstract-view.js';

const getDate = (someDate, format) => dayjs(someDate).format(format);

const changeWord = (array, word) => array.length === 1 ? word : `${word}s`;

const addClassBySubmit = (submit, className) => submit ? className : '';

const adjustElement = (container) => container instanceof AbstractView ? container.element : container;

export {getDate, changeWord, addClassBySubmit, adjustElement};
