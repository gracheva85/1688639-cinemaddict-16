import AbstractView from './abstract-view.js';

const createStats = () => (
  '<a href="#stats" class="main-navigation__additional">Stats</a>'
);

export default class Stats extends AbstractView {
  get template(){
    return createStats();
  }
}
