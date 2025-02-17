export const SORT_OPTIONS = {
  RATING_DESC: 'ratingDesc',
  RATING_ASC: 'ratingAsc',
  ALPHA_ASC: 'alphaAsc',
  ALPHA_DESC: 'alphaDesc',
} as const

export const SORT_LABELS = {
  [SORT_OPTIONS.RATING_DESC]: 'Rating (High to Low)',
  [SORT_OPTIONS.RATING_ASC]: 'Rating (Low to High)',
  [SORT_OPTIONS.ALPHA_ASC]: 'Alphabetical (A-Z)',
  [SORT_OPTIONS.ALPHA_DESC]: 'Alphabetical (Z-A)',
} as const

export const FILTER_DEFAULTS = {
  MIN_RATING: 0,
  DEFAULT_SORT: SORT_OPTIONS.RATING_DESC,
  GENRES_LIMIT: 5,
  TOTAL_PAGES: 331,
  TOTAL_SHOWS: 82616,
} as const

export const NO_AVATAR_URL = '/images/no-avatar.svg'
export const NO_POSTER_URL = '/images/no-poster.svg'
