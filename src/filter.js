const filmToFilterMap = {
  watchlist: (films) => films
    .filter((film) => film.user_details.watchlist).length,
  history: (films) => films
    .filter((film) => film.user_details.already_watched).length,
  favorites: (films) => films
    .filter((film) => film.user_details.favorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
