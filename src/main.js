import {RenderPosition, render, remove} from './utils/render.js';
import {generateFilm, COMMENTS_ARRAY} from './mock/structures.js';
import {generateFilter} from './filter.js';
import {adjustElement} from './utils/film.js';
import Profil from './view/profile-view.js';
import Navigation from './view/main-navigation.js';
import SortView from './view/sort-view.js';
import MenuView from './view/menu/site-menu.js';
import Stats from './view/stats.js';
import Film from './view/film.js';
import FilmList from './view/film-list.js';
import FilmListContainer from './view/films-list-container.js';
import FilmCard from './view/film-card/film-card.js';
import FilmTop from './view/film-top.js';
import ButtonShowMore from './view/show-more-button-view.js';
import FilmListExtra from './view/film-list-extra.js';
import NumberOfFilms from './view/number-of-films.js';
import Popup from './view/popup/popup.js';

const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: FILM_COUNT}, generateFilm);

const filtres = generateFilter(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('footer');
const siteBodyElement = document.querySelector('body');

//Профиль:
render(siteHeaderElement, new Profil(), RenderPosition.BEFOREEND);

// Меню:
const menuComponent = new Navigation();
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);
render(menuComponent, new MenuView(filtres), RenderPosition.BEFOREEND);
render(menuComponent, new Stats(), RenderPosition.BEFOREEND);

//Сортировка:
render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

//Фильмы, список:

const renderFilm = (filmsListElement, film) => {
  const filmCardComponent = new FilmCard(film);
  const popupComponent = new Popup(film, COMMENTS_ARRAY);

  const replaceFilmToPopup = () => {
    render(siteBodyElement, popupComponent, RenderPosition.BEFOREEND);

  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      remove(popupComponent);
      siteBodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmCardComponent.setFilmClickHandler(() => {
    replaceFilmToPopup();
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.setPopupClickHandler(() => {
    remove(popupComponent);
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  });

  const renderFilmComponent = adjustElement(filmsListElement);

  render(renderFilmComponent, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderFilmList = (container, array) => {
  const filmsComponent = new Film();
  render(container, filmsComponent, RenderPosition.BEFOREEND);

  const filmListComponent = new FilmList(array);
  render(filmsComponent, filmListComponent, RenderPosition.BEFOREEND);
  const filmContainerComponent = new FilmListContainer();
  render(filmListComponent, filmContainerComponent, RenderPosition.BEFOREEND);

  for (let item = 0; item < Math.min(array.length, FILM_COUNT_PER_STEP); item++) {
    renderFilm(filmContainerComponent, array[item]);
  }

  if (array.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;
    //Фильмы, кнопка:
    const buttonShowMoreComponent = new ButtonShowMore();
    render(filmListComponent, buttonShowMoreComponent, RenderPosition.BEFOREEND);

    buttonShowMoreComponent.setClickHandler(() => {
      array
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmContainerComponent, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= array.length) {
        buttonShowMoreComponent.remove();
      }
    });
  }

  //Фильмы - экстра
  const removeExtraBlock = (filmArray, component) => filmArray.length === 0 && remove(component);

  const listExtraTopComponent = new FilmListExtra('Top rated');
  removeExtraBlock(films, listExtraTopComponent);
  render(filmsComponent, listExtraTopComponent, RenderPosition.BEFOREEND);
  const filmTopComponent = new FilmTop();
  render(listExtraTopComponent, filmTopComponent, RenderPosition.BEFOREEND);

  const listExtraCommentedComponent = new FilmListExtra('Most commented');
  removeExtraBlock(films, listExtraCommentedComponent);
  render(filmsComponent, listExtraCommentedComponent, RenderPosition.BEFOREEND);
  const filmMostCommented = new FilmTop();
  render(listExtraCommentedComponent, filmMostCommented, RenderPosition.BEFOREEND);

  for (const film of films.slice(0, 2)) {
    renderFilm(filmTopComponent, film);
    renderFilm(filmMostCommented, film);
  }
};

renderFilmList(siteMainElement, films);

//Количество фильмов
render(siteFooterElement, new NumberOfFilms(films), RenderPosition.BEFOREEND);
