import { Injectable } from '@angular/core';

export type Lang = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private key = 'lang';

  init() {
    this.set(this.get());
  }

  set(lang: Lang) {
    localStorage.setItem(this.key, lang);

    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  get(): Lang {
    return (localStorage.getItem(this.key) as Lang) || 'en';
  }
}
