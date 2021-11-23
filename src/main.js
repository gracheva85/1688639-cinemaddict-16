import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {createSortContent} from './view/sort-view.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createFilmListTemplate, createFilmCardTemplate} from './view/film-list-view.js';
import {createButtonShowMore} from './view/show-more-button-view.js';
import {createFilmPopuptTemplate} from './view/popup-view.js';

const TASK_COUNT = 5;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');

renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortContent(), RenderPosition.BEFOREEND);
renderTemplate(siteHeaderElement, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmListTemplate(), RenderPosition.BEFOREEND);

const filmListContainer = siteMainElement.querySelector('.films-list__container');

for (let item = 0; item <TASK_COUNT; item++) {
  renderTemplate(filmListContainer, createFilmCardTemplate(), RenderPosition.BEFOREEND);
}

const filmList = siteMainElement.querySelector('.films-list');

renderTemplate(filmList, createButtonShowMore(), RenderPosition.BEFOREEND);
renderTemplate(siteBodyElement, createFilmPopuptTemplate(), RenderPosition.BEFOREEND);

//Скрыла попап временно, чтобы не закрывал основную страницу:
const popupElement = siteBodyElement.querySelector('.film-details');
popupElement.style.display = 'none';
