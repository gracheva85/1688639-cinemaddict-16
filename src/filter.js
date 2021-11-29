const filmToFilterMap = {
  Watchlist: (films) => films
    .filter((film) => film.user_details.watchlist).length,
  History: (films) => films
    .filter((film) => film.user_details.already_watched).length,
  Favorites: (films) => films
    .filter((film) => film.user_details.favorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
