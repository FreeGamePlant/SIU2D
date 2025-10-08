// Copied from SIU2Dgame.html for i18n integration in tut.html
class I18n {
  constructor() {
    this.locale = 'pt';
    this.translations = {};
    this.scriptElement = null;
  }
  async loadLocale(lang) {
    try {
      const response = await fetch(`../assets/locales/${lang}.json`);
      this.translations[lang] = await response.json();
      this.locale = lang;
      this.applyTranslations();
      this.loadLanguageScript(lang);
      localStorage.setItem('siu2d_lang', lang);
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
    }
  }
  loadLanguageScript(lang) {
    if (this.scriptElement) {
      this.scriptElement.remove();
    }
    this.scriptElement = document.createElement('script');
    this.scriptElement.id = 'language-script';
    this.scriptElement.src = `../script/js/singu.${lang}.js`;
    document.head.appendChild(this.scriptElement);
  }
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.locale];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for ${key} in ${this.locale}`);
        return key;
      }
    }
    return value;
  }
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });
  }
}
window.I18n = I18n;
