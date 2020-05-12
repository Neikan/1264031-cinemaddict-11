import AbstractSmartComponent from "./abstract/component-smart";
import {createDetailsInfo} from "./film-details/details-info";
import {createControls} from "./film-details/controls";
import {createCommentBlock} from "./film-details/comments";
import {DetailsElement, Flag, SHAKE_AINMATION, BtnName, BTN_ATTRIBUTE} from "../consts";
import {getImageElement} from "../utils/components";
import {getIndex} from "../utils/common";


/**
 * Создание разметки блока подробной карточки фильма
 * @param {Object} filmData данные фильма
 * @return {string} разметка блока
 */
const createFilmDetails = (filmData) => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${createDetailsInfo(filmData)}
          ${createControls(filmData)}
        </div>
        ${createCommentBlock(filmData)}
      </form>
    </section>`
  );
};


/**
 * Создание класса подробной карточки фильма
 */
export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmData, dataChangeHandler, api) {
    super();

    this._filmData = filmData;
    this._dataChangeHandler = dataChangeHandler;
    this._api = api;
  }


  /**
   * Метод, обеспечивающий создание компонента по заданному шаблону
   * @return {Object}
   */
  getTemplate() {
    return createFilmDetails(this._filmData);
  }


  /**
   * Метод, обеспечивающий восставновление слушателей
   */
  recoveryListeners() {
    this._subscribeOnEvents();
  }


  /**
   * Метод, обеспечивающий перерисовку карточки
   */
  rerender() {
    super.rerender();
  }


  /**
   * Метод, обспечивающий добавление помощника на кнопку закрытия карточки
   * @param {Function} handler
   */
  setBtnCloseClickHandler(handler) {
    this.getElement().querySelector(`.${DetailsElement.BTN_CLOSE}`)
      .addEventListener(`click`, handler);
  }


  /**
   * Метод, обеспечивающий подписку на события на карточке
   */
  _subscribeOnEvents() {
    const element = this.getElement();
    this._changeIsWatch(element);
    this._changeIsWatched(element);
    this._changeIsFavorite(element);
    this._setEmojiClickHandler();
    this._setTextAreaInputHandler();
    this._setBtnDeleteCommentClickHandler();
  }


  /**
   * Метод, выполняющий установку смайла в форму комментария
   */
  _setEmojiClickHandler() {
    const emojiAddBlock = this.getElement().querySelector(`.${DetailsElement.EMOJI_ADD_BLOCK}`);

    [...this.getElement().querySelectorAll(`.${DetailsElement.EMOJI_ITEM}`)]
        .map(this._getEmojiClickHandler(emojiAddBlock));
  }


  /**
   * Метод, выполняющий проверку наличия класса ошибки на поле ввода комментария
   */
  _setTextAreaInputHandler() {
    const textArea = this.getElement().querySelector(`.${DetailsElement.COMMENT_INPUT}`);

    textArea.addEventListener(`input`, this._getTextAreaInputHandler(textArea));
  }


  /**
   * Метод, обеспечивающий добавление слушателей на кнопки удаления комментариев
   */
  _setBtnDeleteCommentClickHandler() {
    [...this.getElement().querySelectorAll(`.${DetailsElement.BTN_COMMENT_DELETE}`)]
        .map(this._getBtnDeleteCommentClickHandler());
  }


  /**
   * Метод, обеспечиваюющий создание помощника для добавления смайла в форму комментария
   * @param {Object} emojiAddBlock блок, для которого выполняется добавление смайла
   * @return {Function} созданный помощник
   */
  _getEmojiClickHandler(emojiAddBlock) {
    return (smile) => {
      smile.addEventListener(`click`, () => {
        if (emojiAddBlock.firstChild) {
          emojiAddBlock.removeChild(emojiAddBlock.firstChild);
        }
        emojiAddBlock.appendChild(getImageElement(smile.value));

        if (emojiAddBlock.classList.contains(DetailsElement.ERROR)) {
          emojiAddBlock.classList.remove(DetailsElement.ERROR);
        }
      });
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для удаления класса ошибки с поля ввода комментария
   * @param {Object} textArea поле ввода комментария
   * @return {Function} созданный помощник
   */
  _getTextAreaInputHandler(textArea) {
    return () => {
      if (textArea.classList.contains(DetailsElement.ERROR)) {
        textArea.classList.remove(DetailsElement.ERROR);
      }
    };
  }


  /**
   * Метод, обеспечивающий создание помощника для удаления комментария
   * @return {Function} созданный помощник
   */
  _getBtnDeleteCommentClickHandler() {
    return (btn) => {
      btn.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const commentItem = evt.target.closest(`.${DetailsElement.COMMENT_ITEM}`);

        this._checkClassesCommentItem(commentItem);
        this._setBtnDeleteAttributesForDeleting(btn);
        this._removeCommentAfterRequest(commentItem, btn);
      });
    };
  }


  /**
   * Метод, удаляющий дополнительные атрибуты с кнопки удаления комментария, если в процессе удаления произошла ошибка
   * @param {Object} btn кнопка удаления комментария
   */
  _setBtnDeleteAttributesFailureDeleting(btn) {
    btn.removeAttribute(BTN_ATTRIBUTE);
    btn.textContent = BtnName.DELETE;
  }


  /**
   * Метод, добавляющий дополнительные атрибуты для кнопки удаления комментария при запуске процесса удаления
   * @param {Object} btn кнопка удаления комментария
   */
  _setBtnDeleteAttributesForDeleting(btn) {
    btn.setAttribute(BTN_ATTRIBUTE, `${Flag.YES}`);
    btn.textContent = BtnName.DELETING;
  }


  /**
   * Метод, выполняющий обновление текущего количества комментариев
   */
  _updateCommentsCount() {
    this.getElement().querySelector(`.${DetailsElement.COMMENT_COUNT}`)
      .textContent = this._filmData.comments.length;
  }


  /**
   * Метод, выполняющий запрос к серверу и удаление комментария
   * @param {Object} commentItem блок удаляемого комментария
   * @param {Object} btn кнопка удаления комментария
   */
  _removeCommentAfterRequest(commentItem, btn) {
    this._api.deleteCommentData(commentItem.dataset.commentId)
      .then(() => {
        this._removeComment(commentItem);
        this._updateCommentsCount();
      })
      .catch(() => {
        this._setBtnDeleteAttributesFailureDeleting(btn);
        commentItem.classList.add(`${SHAKE_AINMATION}`);
      });
  }


  /**
   * Метод, выполняющий удаление комментария
   * @param {Object} target
   */
  _removeComment(target) {
    this._filmData.comments.splice(
        getIndex(this._filmData.comments, target.dataset.commentId), 1
    );
    this._filmData.commentsIds.splice(
        getIndex(this._filmData.commentsIds, target.dataset.commentId), 1
    );
    target.remove();
  }


  /**
   * Метод, обеспечивающий проверку наличий дополнительных классов на блоке комментария
   * @param {Object} commentItem блок комментария
   */
  _checkClassesCommentItem(commentItem) {
    if (commentItem.classList.contains(`${SHAKE_AINMATION}`)) {
      commentItem.classList.remove(`${SHAKE_AINMATION}`);
    }
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из запланированного к просмотру
   * @param {Object} element
   */
  _changeIsWatch(element) {
    element.querySelector(`.${DetailsElement.BTN_WATCHLIST}`)
      .addEventListener(`click`, () => {
        const oldFilmData = this._filmData;
        this._filmData.isWatch = !this._filmData.isWatch;
        this._filmData = this._dataChangeHandler(oldFilmData, this._filmData);
      });
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из просмотренного
   * @param {Object} element
   */
  _changeIsWatched(element) {
    element.querySelector(`.${DetailsElement.BTN_HISTORY}`)
      .addEventListener(`click`, () => {
        const oldFilmData = this._filmData;

        this._filmData.isWatched = !this._filmData.isWatched;
        if (this._filmData.isWatched === Flag.YES) {
          this._filmData.watchedDate = new Date();
        } else {
          this._filmData.watchedDate = null;
        }
        this._filmData = this._dataChangeHandler(oldFilmData, this._filmData);
      });
  }


  /**
   * Метод, обеспечивающий добавление/удаление фильма из избранного
   * @param {Object} element
   */
  _changeIsFavorite(element) {
    element.querySelector(`.${DetailsElement.BTN_FAVORITE}`)
      .addEventListener(`click`, () => {
        const oldFilmData = this._filmData;
        this._filmData.isFavorite = !this._filmData.isFavorite;
        this._filmData = this._dataChangeHandler(oldFilmData, this._filmData);
      });
  }
}
