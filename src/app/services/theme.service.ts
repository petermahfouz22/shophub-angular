import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private key = 'theme';

  init() {
    this.apply(this.get());
  }

  set(theme: Theme) {
    localStorage.setItem(this.key, theme);
    this.apply(theme);
  }

  get(): Theme {
    return (localStorage.getItem(this.key) as Theme) || 'system';
  }

  private apply(theme: Theme) {
    const html = document.documentElement;
    html.classList.remove('dark');

    if (theme === 'dark') {
      html.classList.add('dark');
    }

    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) html.classList.add('dark');
    }
  }
}
