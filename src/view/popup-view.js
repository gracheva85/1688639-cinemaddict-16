import {getDate, changeWord, addClassBySubmit} from '../utils.js';
import {createElement} from '../render.js';

const renderFilmDetailsTable = (name, value) => (
  `<tr class="film-details__row">
  <td class="film-details__term">${name}</td>
  <td class="film-details__cell">${value}</td>
</tr>`
);

const renderElementGenre = (array) => {
  if (array.length > 0) {
    const box = [];
    for (const element of array)
    {box.push(`<span class="film-details__genre">${element}</span>`);}
    return box;
  }
};

const createCommentTemplate = (commentId, array) => {
  const commentBox = [];

  for (const element of array) {
    if (commentId.includes(element.id)) {

      const {author, comment, date, emotion} = element;
      const formatedDate = getDate(date, 'YYYY/MM/DD HH:mm');

      commentBox.push(`<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${formatedDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
      </li>`);
    }
  }
  return commentBox;
};

const createFilmPopupTemplate = (film, array) => {
  const {title, runtime, genre, description, poster, director, writers, actors} = film.film_info;
  const rating = film.film_info.total_rating;
  const date = film['film_info']['release']['date'];
  const {watchlist} = film['user_details'];
  const watchFilm = film['user_details']['already_watched'];
  const favorite = film['user_details']['favorite'];
  const ageRating = film['film_info']['age_rating'];
  const alternativeTitle = film['film_info']['alternative_title'];
  const country = film['film_info']['release']['release_country'];


  const dateFormat = getDate(date, 'D MMMM YYYY');

  const getTime = () => {
    const hours = Math.trunc(runtime/60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}м`;
  };

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              ${renderFilmDetailsTable('Director', director)}
              ${renderFilmDetailsTable('Writers', writers.join(', '))}
              ${renderFilmDetailsTable('Actors', actors.join(', '))}
              ${renderFilmDetailsTable('Release Date', dateFormat)}
              ${renderFilmDetailsTable('Runtime', getTime())}
              ${renderFilmDetailsTable('Country', country)}
              ${renderFilmDetailsTable(changeWord(genre, 'Genre'), renderElementGenre(genre).join(' '))}
            </table>

           <p class="film-details__film-description">
            ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${addClassBySubmit(watchlist, 'film-details__control-button--active')} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${addClassBySubmit(watchFilm, 'film-details__control-button--active')} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${addClassBySubmit(favorite, 'film-details__control-button--active')} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
       </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createCommentTemplate(film.comments, array).join('')}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
           </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
             </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup {
  #element = null;
  #film = null;
  #array = null;

  constructor(film, array) {
    this.#film = film;
    this.#array = array;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template(){
    return createFilmPopupTemplate(this.#film, this.#array,);
  }

  removeElement() {
    this.#element = null;
  }
}
