import {RenderPosition, render} from './render.js';
import {generateFilm, COMMENTS_ARRAY} from './mock/structures.js';
import {generateFilter} from './filter.js';
import {getData} from './api.js';
import Profil from './view/profile-view.js';
import Navigation from './view/main-navigation.js';
import SortView from './view/sort-view.js';
import MenuView from './view/site-menu-view.js';
import Stats from './view/stats.js';
import Film from './view/film.js';
import FilmList from './view/film-list.js';
import FilmListContainer from './view/films-list-container.js';
import FilmCard from './view/film-list-view.js';
import FilmTop from './view/film-top.js';
import ButtonShowMore from './view/show-more-button-view.js';
import FilmListExtra from './view/film-list-extra.js';
import NumberOfFilms from './view/number-of-films.js';
import Popup from './view/popup-view.js';

const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: FILM_COUNT}, generateFilm);

//Временный вызов getData:
getData(
  'https://16.ecmascript.pages.academy/cinemaddict/movies',
  ((data) => data), //тут был вывод массива в консоль для сравнения со структурой моков
  'er883jdzbdw'
);

const filtres = generateFilter(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('footer');
const siteBodyElement = document.querySelector('body');

//Профиль:
render(siteHeaderElement, new Profil().element, RenderPosition.BEFOREEND);

// Меню:
const menuComponent = new Navigation();
render(siteMainElement, menuComponent.element, RenderPosition.BEFOREEND);
render(menuComponent.element, new MenuView(filtres).element, RenderPosition.BEFOREEND);
render(menuComponent.element, new Stats().element, RenderPosition.BEFOREEND);

//Сортировка:
render(siteMainElement, new SortView().element, RenderPosition.BEFOREEND);

//Фильмы, список:

const renderFilm = (filmsListElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const popupComponent = new Popup(film, COMMENTS_ARRAY);

  const replaceFilmToPopup = () => {
    render(siteBodyElement, popupComponent.element, RenderPosition.BEFOREEND);

  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      siteBodyElement.removeChild(popupComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    replaceFilmToPopup();
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    siteBodyElement.removeChild(popupComponent.element);
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(filmsListElement, filmCardComponent.element, RenderPosition.BEFOREEND);
};

const renderFilmList = (container, array) => {
  const filmsComponent = new Film();
  render(container, filmsComponent.element, RenderPosition.BEFOREEND);

  const filmListComponent = new FilmList(array);
  render(filmsComponent.element, filmListComponent.element, RenderPosition.BEFOREEND);
  const filmContainerComponent = new FilmListContainer();
  render(filmListComponent.element, filmContainerComponent.element, RenderPosition.BEFOREEND);

  for (let item = 0; item < Math.min(array.length, FILM_COUNT_PER_STEP); item++) {
    renderFilm(filmContainerComponent.element, array[item]);
  }

  if (array.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;
    //Фильмы, кнопка:
    const buttonShowMoreComponent = new ButtonShowMore();
    render(filmListComponent.element, buttonShowMoreComponent.element, RenderPosition.BEFOREEND);

    buttonShowMoreComponent.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      array
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmContainerComponent.element, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= array.length) {
        buttonShowMoreComponent.remove();
      }
    });
  }

  //Фильмы - экстра
  const removeExtraBlock = (filmArray, component) => {
    if (filmArray.length === 0) {component.element.removeElement();}
  };

  const listExtraTopComponent = new FilmListExtra('Top rated');
  removeExtraBlock(films, listExtraTopComponent);
  render(filmsComponent.element, listExtraTopComponent.element, RenderPosition.BEFOREEND);
  const filmTopComponent = new FilmTop();
  render(listExtraTopComponent.element, filmTopComponent.element, RenderPosition.BEFOREEND);

  const listExtraCommentedComponent = new FilmListExtra('Most commented');
  removeExtraBlock(films, listExtraCommentedComponent);
  render(filmsComponent.element, listExtraCommentedComponent.element, RenderPosition.BEFOREEND);
  const filmMostCommented = new FilmTop();
  render(listExtraCommentedComponent.element, filmMostCommented.element, RenderPosition.BEFOREEND);

  for (const film of films.slice(0, 2)) {
    renderFilm(filmTopComponent.element, film);
    renderFilm(filmMostCommented.element, film);
  }
};

renderFilmList(siteMainElement, films);

//Количество фильмов
render(siteFooterElement, new NumberOfFilms(films).element, RenderPosition.BEFOREEND);
