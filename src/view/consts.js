export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const FILM_BLOCKS = {
  main: {
    title: 'All movies. Upcoming',
    isTitleHidden: true
  },
  topRated: {
    title: 'Top rated',
    isExtra: true
  },
  mostCommented: {
    title: 'Most commented',
    isExtra: true
  },
  empty: {
    title: 'There are no movies in our database',
    isEmpty: true
  }
};

export const EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];
