import AbstractComponent from "./abstract/component";
import {CARD_ELEMENTS, CardElement, ClassMarkup, FILM_DESCRIPTION_LENGTH, NOT_DATA} from "../consts";
import {formatDuration} from "../utils/common";


/**
 * Создание разметки блока стандартной карточки фильма
 * @param {Object} filmData данные фильма
 * @param {string} filmsBlock название компонента-контейнера фильмов
 * @return {string} разметка блока
 */
const createFilmCard = ({
  promo,
  titles,
  rating,
  details,
  commentsIds,
  isWatch,
  isWatched,
  isFavorite
}, filmsBlock
) => {
  const classMarkup = {
    'addToWatch': isWatch ? ` ` + CardElement.BTN_ACTIVE : ``,
    'markAsWatched': isWatched ? ` ` + CardElement.BTN_ACTIVE : ``,
    'markAsFavourite': isFavorite ? ` ` + CardElement.BTN_ACTIVE : ``
  };

  const checkGenre = details.genres.length ? details.genres[0] : NOT_DATA;

  const formatDescription = details.description.length > FILM_DESCRIPTION_LENGTH ?
    `${details.description.substring(0, FILM_DESCRIPTION_LENGTH - 1)}...` : details.description;

  return (
    `<article class="film-card" data-films-block="${filmsBlock}">
      <h3 class="film-card__title">${titles.translate}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${details.year}</span>
        <span class="film-card__duration">${formatDuration(details.duration.info)}</span>
        <span class="film-card__genre">${checkGenre}</span>
      </p>
      <img src="${promo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${formatDescription}</p>
      <a class="film-card__comments">${commentsIds.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button
          film-card__controls-item--add-to-watchlist${classMarkup[`addToWatch`]}">Add to watchlist</button>
        <button class="film-card__controls-item button
          film-card__controls-item--mark-as-watched${classMarkup[`markAsWatched`]}">Mark as watched</button>
        <button class="film-card__controls-item button
          film-card__controls-item--favorite${classMarkup[`markAsFavourite`]}">Mark as favorite</button>
      </form>
    </article>`
  );
};


/**
 * Создание класса стандартной карточки фильма
 */
export default class FilmCard extends AbstractComponent {
  constructor(filmData, filmsBlock) {
    super();

    this._filmData = filmData;
    this._filmsBlock = filmsBlock;
  }

  getTemplate() {
    return createFilmCard(this._filmData, this._filmsBlock);
  }

  setClickHandler(handler) {
    for (const cardElement of CARD_ELEMENTS) {
      const target = this.getElement().querySelector(`.${cardElement}`);
      target.classList.add(ClassMarkup.POINTER);
      target.addEventListener(`click`, handler);
    }
  }

  setBtnWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.${CardElement.BTN_WATCHLIST}`)
      .addEventListener(`click`, handler);
  }

  setBtnWatchedClickHandler(handler) {
    this.getElement().querySelector(`.${CardElement.BTN_HISTORY}`)
      .addEventListener(`click`, handler);
  }

  setBtnFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.${CardElement.BTN_FAVORITE}`)
    .addEventListener(`click`, handler);
  }
}
