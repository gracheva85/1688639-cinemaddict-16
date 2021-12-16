import dayjs from 'dayjs';
import AbstractView from '../view/abstract-view.js';

const getDate = (someDate, format) => dayjs(someDate).format(format);

const changeWord = (array, word) => array.length === 1 ? word : `${word}s`;

const addClassBySubmit = (submit, className) => submit ? className : '';

const adjustElement = (container) => container instanceof AbstractView ? container.element : container;

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortDate = (filmA, filmB) => getDate(filmB.film_info.release.date, 'YYYY') - getDate(filmA.film_info.release.date, 'YYYY');

const sortRating = (filmA, filmB) => filmB.film_info.total_rating - filmA.film_info.total_rating;

const sortComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

export {getDate, changeWord, addClassBySubmit, adjustElement, updateItem, sortDate, sortRating, sortComments};
