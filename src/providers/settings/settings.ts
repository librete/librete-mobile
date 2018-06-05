import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ENV } from '@app/env';

import { Settings } from '../../models/settings';

@Injectable()
export class SettingsProvider {
  private _env = ENV;
  private _settings = new Settings();

  constructor(private _storage: Storage) {
  }

  public get language() {
    return this._settings.language;
  }

  public set language(language: string) {
    this._settings.language = language;
    this._storage.set('settings', this._settings);
  }

  public readSettings(): Promise<any> {
    return new Promise(resolve => {
      this._storage.ready().then(() => {
        this._storage.get('settings').then((settings: Settings) => {
          if (settings) {
            this._settings = settings;
            resolve(settings);
          }
          resolve();
        });
      });
    });
  }
}
