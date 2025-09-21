export type language = 'en' | 'ar';

export class Language {
  private static _name: language
  constructor(lang: language = 'en') {
    Language._name = lang;
    localStorage.setItem('lang', Language._name);
  }

  static get getCurrentLang(): language {
    return Language._name ?? (localStorage.getItem('lang') as language)
  }

  static set changeLang(newLang: language) {
    Language._name = newLang;
    localStorage.setItem('lang', Language._name);
  }
}