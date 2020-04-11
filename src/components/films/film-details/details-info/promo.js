/**
 * Создание разметки постера и возрастного ограничения
 * @param {Object} {постер и ограничение}
 * @return {string} разметка
 */
const createPromo = ({poster, age}) => {
  return (`
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
      <p class="film-details__age">${age}</p>
    </div>
  `);
};

export {createPromo};