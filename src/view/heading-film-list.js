import AbstractView from './abstract-view.js';

export const headingFilmListTemplate = (films) => `<h2 class="films-list__title ${(films.length !== 0) ? 'visually-hidden' : ''}">${(films.length !== 0) ? 'All movies. Upcoming' : 'There are no movies in our database'}</h2>`;

export default class HeadingFilmList extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template(){
    return headingFilmListTemplate(this.#films);
  }
}
