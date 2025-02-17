/* eslint-disable @typescript-eslint/no-empty-object-type */
import { SORT_OPTIONS } from './constants'

export interface ISchedule {
  time: string
  days: string[]
}
export interface IRating {
  average: number
}
export interface ICountry {
  name: string
  code: string
  timezone: string
}
export interface INetwork {
  id: number
  name: string
  country: ICountry
  officialSite: string
}
export interface IExternals {
  tvrage: number
  thetvdb: number
  imdb: string
}
export interface IImage {
  medium: string
  original: string
}
export interface IExtraImage {
  id: number
  type: string
  main: boolean
  resolutions: {
    original: {
      url: string
      width: number
      height: number
    }
    medium: {
      url: string
      width: number
      height: number
    }
  }
}
export interface ISelf {
  href: string
  name?: string
}
export interface IPreviousEpisode extends ISelf {}
export interface INextEpisode extends ISelf {}
export interface IShowLink extends ISelf {}
export interface ICharacterLink extends ISelf {}
export interface ILinks {
  self?: ISelf
  previousepisode?: IPreviousEpisode
  nextepisode?: INextEpisode
  show?: IShowLink
  character?: ICharacterLink
}
export interface IEmbedded {
  show?: IShow
  seasons?: ISeason[]
  episodes?: IEpisode[]
  cast?: ICast[]
  castcredits?: ICastCredits[]
  crew?: ICrew[]
  crewcredits?: ICrewCredits[]
  akas?: IAka[]
  images?: IExtraImage[]
}

export interface IAka {
  name: string
  country: ICountry
}
export interface ICrewCredits {
  type: string
  _links: ILinks
}
export interface ICastCredits {
  _links: ILinks
}
export interface IEpisode {
  id: number
  url: string
  name: string
  season: number
  number: number
  airdate: string
  airtime: string
  airstamp: string
  runtime: number
  image: IImage
  summary: string
  _links: ILinks
  rating: IRating
}
export interface ISeason {
  id: number
  url: string
  number: number
  name: string
  episodeOrder: number
  premiereDate: string
  endDate: string
  network: INetwork
  webChannel: string | null
  image: IImage
  summary: string
  _links: ILinks
}
export interface IUpdates {
  [key: number]: number
}
export interface IPerson {
  id: number
  name: string
  url: string
  country: ICountry
  birtday: string
  deathday: string | null
  image: IImage
  _links: ILinks
}
export interface ICharacter {
  id: number
  url: string
  name: string
  image: IImage
  _links: ILinks
}
export interface ICast {
  person: IPerson
  character: ICharacter
  self: boolean
  voice: boolean
}
export interface ICrew {
  type: string
  person: IPerson
}
export interface IShow {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  premiered: string
  officialSite: string
  schedule: ISchedule
  rating: IRating
  weight: number
  network: INetwork
  webChannel: string | null
  externals: IExternals
  image: IImage
  summary: string
  updated: number
  _links: ILinks
  _embedded?: IEmbedded
  averageRuntime: number
  ended: string | null
  dvdCountry: string | null
}
export interface IShowDetails extends IShow {
  _embedded: IEmbedded
}
export interface IShowSearch {
  score: number
  show: IShow
}

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

export {}
