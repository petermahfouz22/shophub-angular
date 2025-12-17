import { Component, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../services/theme.service';
import { LanguageService, Lang } from '../services/language.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './setting.component.html',
})
export class SettingComponent implements OnInit {
  theme!: Theme;
  lang!: Lang;

  isSaving = false;
  saved = false;

  constructor(
    private themeService: ThemeService,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.theme = this.themeService.get();
    this.lang = this.langService.get();
  }

  save() {
    this.isSaving = true;
    this.saved = false;

    setTimeout(() => {
      this.themeService.set(this.theme);
      this.langService.set(this.lang);

      this.isSaving = false;
      this.saved = true;

      setTimeout(() => (this.saved = false), 2000);
    }, 1500);
  }
}
