
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { translation: { app_name: "Anaptiras", cta_create: "Create a room", see_ad_to_unlock: "Watch an ad to unlock a new room", ghost: "Ghost", crew: "Crew", custom: "Custom" } },
  el: { translation: { app_name: "Anaptiras", cta_create: "Φτιάξε δωμάτιο", see_ad_to_unlock: "Δες μια διαφήμιση για να ξεκλειδώσεις νέο δωμάτιο", ghost: "Ghost", crew: "Crew", custom: "Custom" } }
};

export function initI18n() {
  if (!i18next.isInitialized) {
    i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        detection: { order: ['querystring','cookie','localStorage','navigator'] }
      })
  }
  return i18next
}
