import isNode from 'detect-node'
import i18n from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import i18nextFetchBackend from 'i18next-fetch-backend'

import { InitPromise } from '../types'

export default (config) => {
  let initPromise: InitPromise

  if (!i18n.isInitialized) {
    i18n.use(i18nextFetchBackend)

    if (isNode) {
      const i18nextMiddleware = eval("require('i18next-express-middleware')")
      if (config.serverLanguageDetection) {
        const serverDetectors = new i18nextMiddleware.LanguageDetector()
        config.customDetectors.forEach(detector => serverDetectors.addDetector(detector))
        i18n.use(serverDetectors)
      }
    } else {
      if (config.browserLanguageDetection) {
        const browserDetectors = new I18nextBrowserLanguageDetector()
        config.customDetectors.forEach(detector => browserDetectors.addDetector(detector))
        i18n.use(browserDetectors)
      }
    }

    config.use.forEach(x => i18n.use(x))
    initPromise = i18n.init(config)

  }
  return { i18n, initPromise }
}
