import i18n from 'i18n-js';

const languages = {
  en: () => require('../../locales/en.json'),
  km: () => require('../../locales/km.json'),
};

export const translate = lang => {
  i18n.translations = {[lang]: languages[lang]()};
  i18n.locale = lang;
};
