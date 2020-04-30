import {createDetailsInfo} from "./film-details/details-info";
import {createControls} from "./film-details/controls";
import {createCommentBlock} from "./film-details/comments";
import {DetailsElement, ControlName, CONTROL_LABEL} from "../consts";
import AbstractSmartComponent from "./abstract/component-smart";


/**
 * Создание разметки блока подробной карточки фильма
 * @param {Object} film фильм
 * @return {string} разметка блока
 */
const createFilmDetails = (film) => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${createDetailsInfo(film)}
          ${createControls(film)}
        </div>
        ${createCommentBlock(film)}
      </form>
    </section>`
  );
};


/**
 * Создание класса подробной карточки фильма
 */
export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._comments = film.comments;
  }


  getTemplate() {
    return createFilmDetails(this._film);
  }


  recoveryListeners() {
    this._subscribeOnEvents();
  }


  rerender() {
    super.rerender();
  }


  setBtnCloseClickHandler(handler) {
    this.getElement().querySelector(`.${DetailsElement.BTN_CLOSE}`)
      .addEventListener(`click`, handler);
  }


  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.${CONTROL_LABEL}${ControlName.WATCHLIST}`)
      .addEventListener(`click`, () => {
        this._film.isWatch = !this._film.isWatch;
      });

    element.querySelector(`.${CONTROL_LABEL}${ControlName.WATCHED}`)
      .addEventListener(`click`, () => {
        this._film.isWatched = !this._film.isWatched;
      });

    element.querySelector(`.${CONTROL_LABEL}${ControlName.FAVORITE}`)
      .addEventListener(`click`, () => {
        this._film.isWatched = !this._film.isWatched;
      });

  }
}
