import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {createSortContent} from './view/sort-view.js';
import {createProfileTemplate} from './view/profile-view.js';
import {createFilmListTemplate, createFilmCardTemplate} from './view/film-list-view.js';
import {createButtonShowMore} from './view/show-more-button-view.js';
import {createFilmPopuptTemplate} from './view/popup-view.js';
import {createNumberOfFilms} from './view/number-of-films.js';
import {generateFilm, COMMENTS_ARRAY} from './mock/structures.js';
import {generateFilter} from './filter.js';
import {createFilmListExtra} from './view/film-list-extra.js';

const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: FILM_COUNT}, generateFilm);
const filtres = generateFilter(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const siteFooterElement = document.querySelector('footer');

renderTemplate(siteMainElement, createSiteMenuTemplate(filtres), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortContent(), RenderPosition.BEFOREEND);
renderTemplate(siteHeaderElement, createProfileTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createFilmListTemplate(), RenderPosition.BEFOREEND);

const filmListContainer = siteMainElement.querySelector('.films-list__container');
const filmList = siteMainElement.querySelector('.films-list');

for (let item = 0; item < Math.min(films.length, FILM_COUNT_PER_STEP); item++) {
  renderTemplate(filmListContainer, createFilmCardTemplate(films[item]), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {

  let renderedFilmCount = FILM_COUNT_PER_STEP;
  renderTemplate(filmList, createButtonShowMore(), RenderPosition.BEFOREEND);

  const showMoreButton = filmList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmListContainer, createFilmCardTemplate(film), RenderPosition.BEFOREEND));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderTemplate(siteBodyElement, createFilmPopuptTemplate(films[0], COMMENTS_ARRAY), RenderPosition.BEFOREEND);

const popupElement = siteBodyElement.querySelector('.film-details');
popupElement.style.display = 'none';

renderTemplate(siteMainElement, createFilmListExtra(), RenderPosition.BEFOREEND);
const firstExtraContainer = document.querySelector('#first-extra-container');
const secondExtraContainer = document.querySelector('#second-extra-container');

for (const film of films.slice(0, 2)) {
  renderTemplate(firstExtraContainer, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
  renderTemplate(secondExtraContainer, createFilmCardTemplate(film), RenderPosition.BEFOREEND);
}

renderTemplate(siteFooterElement, createNumberOfFilms(films), RenderPosition.BEFOREEND);
