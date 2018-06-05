import { TestBed, inject } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { SettingsProvider } from './settings';

import { Settings } from '../../models/settings';


class StorageStub {
  public settings = new Settings();
  public set = jasmine.createSpy();

  public get(key: string): Promise<Settings> {
    return new Promise(resolve => {
      resolve(this.settings);
    });
  }

  public ready(): Promise<void> {
    return new Promise(resolve => {
      resolve();
    });
  }
}

describe('Providers: SettingsProvider', () => {
  let provider;
  let storage;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SettingsProvider,
      { provide: Storage, useClass: StorageStub },
    ]
  }));

  beforeEach(inject(
    [SettingsProvider, Storage],
    (_settingsProvider: SettingsProvider, _storage: Storage) => {
      provider = _settingsProvider;
      storage = _storage;
    })
  );


  it('Should read settings from storage', (done) => {
    provider.readSettings().then(
      data => {
        expect(provider.language).toBe(storage.settings.language);
        done();
      }
    );
  });

  it('Should save language to self and to storage', inject([], () => {
    const language = 'bg';
    provider.language = language;
    expect(provider.language).toBe(language);
    expect(storage.set).toHaveBeenCalled();
  }));

});
