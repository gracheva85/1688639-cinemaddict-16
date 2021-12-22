import {getFirstToUpperCase} from '../../utils/common.js';

const createMenuItemTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">${getFirstToUpperCase(name)} <span class="main-navigation__item-count">${count}</span></a>`

  );
};

export const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createMenuItemTemplate(filter, index === 0))
    .join('');

  return   `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </div>`;
};
