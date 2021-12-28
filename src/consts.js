const NUMBER_MINUTES_PER_HOUR = 60;

const CHART_VALUE = {
  TYPE: 'horizontalBar',
  BACKGROUND_COLOR: '#ffe800',
  ANCOR: 'start',
  THICKNESS: 24,
  FONT_SIZE: 20,
  FONT_COLOR: '#fff',
  OFFSET: 40,
  PADDING: 100,
  HEIGHT: 50,
};

const DESCRIPTION_LENGTH = 139;

const FILM_COUNT = {
  PER_STEP: 5,
  EXTRA: 2,
};

const TIME_PERIOD = {
  SECONDS: {
    MAX: 60
  },
  MINUTES: {
    MIN: 1,
    MAX: 60
  },
  HOURS: {
    MIN: 1,
    MAX: 24
  },
  DAYS: {
    MIN: 1,
    MAX: 30
  },
  MONTHS: {
    MIN: 1,
    MAX: 12
  },
};

const AMOUNT_OF_TIME = {
  DAY: 7,
  MONTH: 1,
  YEAR: 1
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


const EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const FilmBlocks = {
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

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  COMMENT: 'COMMENT',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
  STATS: 'Stats',
};


const StatisticsType = {
  ALL: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
};

export {SortType, FilmBlocks, EMOJIS, UserAction, UpdateType, FilterType, CHART_VALUE, StatisticsType, NUMBER_MINUTES_PER_HOUR, DESCRIPTION_LENGTH, FILM_COUNT, TIME_PERIOD, AMOUNT_OF_TIME, Mode};
