import AbstractView from './abstract-view.js';

const createMainNavigation = () => (
  '<nav class="main-navigation"></nav>'
);

export default class Navigation extends AbstractView {
  get template(){
    return createMainNavigation();
  }
}
