import dayjs from 'dayjs';
import AbstractView from '../view/abstract-view.js';
import {remove} from './render.js';

const getDate = (someDate, format) => dayjs(someDate).format(format);

const changeWord = (array, word) => array.length === 1 ? word : `${word}s`;

const addClassBySubmit = (submit, className) => submit ? className : '';

const adjustElement = (container) => container instanceof AbstractView ? container.element : container;

const onEscKeyDown = (evt, component, element) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    remove(component);
    element.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

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

// const getWeightForNull = (itemA, itemB) => {
//   if (itemA === null && itemB === null) {
//     return 0;
//   }

//   if (itemA === null) {
//     return 1;
//   }

//   if (itemB === null) {
//     return -1;
//   }

//   return null;
// };

const sortDate = (filmA, filmB) => getDate(filmB.film_info.release.date, 'YYYY') - getDate(filmA.film_info.release.date, 'YYYY');

const sortRating = (filmA, filmB) => filmB.film_info.total_rating - filmA.film_info.total_rating;

const sortComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

export {getDate, changeWord, addClassBySubmit, adjustElement, onEscKeyDown, updateItem, sortDate, sortRating, sortComments};
