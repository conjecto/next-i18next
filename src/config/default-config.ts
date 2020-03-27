import { isServer } from '../utils'

const DEFAULT_LANGUAGE = 'en'
const OTHER_LANGUAGES = []
const DEFAULT_NAMESPACE = 'common'

export const defaultConfig = {
  defaultLanguage: DEFAULT_LANGUAGE,
  otherLanguages: OTHER_LANGUAGES,
  load: 'currentOnly',
  localeSubpaths: {},
  use: [],
  backend: {},
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format) => (format === 'uppercase' ? value.toUpperCase() : value),
  },
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  ignoreRoutes: ['/_next/', '/static/', '/public/', '/api/'],
  customDetectors: [],
  detection: {
    lookupCookie: 'next-i18next',
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie'],
  },
  react: {
    wait: true,
    useSuspense: false,
  },
  strictMode: true,
  errorStackTraceLimit: 0,
  shallowRender: false,
  get initImmediate() {
    return !isServer()
  }
}
