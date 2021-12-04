import AbstractView from './abstract-view.js';

const createNumberOfFilms = (films) => (
  `<section class="footer__statistics">
  <p>${new Intl.NumberFormat('ru').format(films.length)} movies inside</p>
</section>`
);

export default class NumberOfFilms extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template(){
    return createNumberOfFilms(this.#films);
  }
}
