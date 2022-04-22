import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'

const languageDetector: any = {
  type: 'languageDetector',
  async: true, // If this is set to true, your detect function receives a callback function that you should call with your language, useful to retrieve your language stored in AsyncStorage for example
  init: function (services: any, detectorOptions: any, i18nextOptions: any) {
    /* use services and options */
  },
  detect: function (callback: any) {
    // You'll receive a callback if you passed async true
    /* return detected language */
    // callback('de'); if you used the async flag
    let selectedLanguage = localStorage.getItem('lang')
    return callback(selectedLanguage)
  },
  cacheUserLanguage: function (lng: any) {
    /* cache language */
  }
}

const initializeI18n = (
  namespaces: string[],
  basePath = '/locales/{{lng}}/{{ns}}.json'
) => {
  //  console.log(`${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`)
  i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(languageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng: 'en',
      debug: false,
      ns: namespaces,
      fallbackNS: 'translation',
      backend: {
        loadPath: basePath // http://module-base-url/locales/
      },
      interpolation: {
        escapeValue: false // not needed for react as it escapes by default
      }
    })
}

export default initializeI18n
