export class Language {
    static _name;
    constructor(lang = 'en') {
        Language._name = lang;
        localStorage.setItem('lang', Language._name);
    }
    static get getCurrentLang() {
        return Language._name ?? localStorage.getItem('lang');
    }
    static set changeLang(newLang) {
        Language._name = newLang;
        localStorage.setItem('lang', Language._name);
    }
}
