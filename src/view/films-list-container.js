import AbstractView from './abstract-view.js';

const createFilmListContainerTemplate = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmListContainer extends AbstractView {
  get template(){
    return createFilmListContainerTemplate();
  }
}
