"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Language {
    #name;
    constructor(lang = 'en') {
        this.#name = lang;
        localStorage.setItem('lang', this.#name);
    }
    changeLang(newLang) {
        this.#name = newLang;
        localStorage.setItem('lang', this.#name);
    }
}
exports.default = Language;
