export default class Language {
  #name
  constructor(lang = 'en') {
    this.#name = lang;
    localStorage.setItem('lang', this.#name);
  }

  changeLang(newLang) {
    this.#name = newLang;
    localStorage.setItem('lang', this.#name);
  }
}