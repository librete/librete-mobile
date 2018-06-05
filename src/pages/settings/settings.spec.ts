import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Settings } from '../../models/settings';

import { SettingsPage } from './settings';

import { SettingsProvider } from '../../providers/settings/settings';

class TranslateServiceStub {
  public use = jasmine.createSpy();
}
class SettingsProviderStub {
  public language = 'en';
}

let component: SettingsPage;
let fixture: ComponentFixture<SettingsPage>;

describe('Pages: SettingsPage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPage],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: SettingsProvider, useClass: SettingsProviderStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
  });

  it('Should use Settings model language options', () => {
    expect(component.languages).toEqual(Settings.languages);
  });

  it('Should get current language', inject(
    [SettingsProvider],
    (_settingsProvider: SettingsProvider) => {
      expect(component.currentLanguage).toEqual(_settingsProvider.language);
    }
  ));

  it('Should change language', inject(
    [TranslateService, SettingsProvider],
    (_translateService: TranslateService, _settingsProvider: SettingsProvider) => {
      const language = 'bg';
      component.changeLanguage(language);
      expect(_translateService.use).toHaveBeenCalledWith(language);
      expect(_settingsProvider.language).toEqual(language);
    }
  ));

});
