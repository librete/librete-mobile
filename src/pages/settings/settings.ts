import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Settings } from '../../models/settings';

import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public currentLanguage: string;

  constructor(
    private _translateService: TranslateService,
    private _settingsProvider: SettingsProvider
  ) {
    this.currentLanguage = this._settingsProvider.language;
  }

  public get languages() {
    return Settings.languages;
  }

  public changeLanguage(language: string) {
    this._translateService.use(language);
    this._settingsProvider.language = language;
  }
}
