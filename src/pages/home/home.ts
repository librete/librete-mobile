import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { SettingsProvider } from '../../providers/settings/settings';
import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private _translateService: TranslateService,
    private _settingsProvider: SettingsProvider,
    private _categoriesProvider: CategoriesProvider
  ) {

    _settingsProvider.readSettings().then(
      data => {
        if (data && data.language) {
          _translateService.use(data.language);
        }
      }
    );

    _categoriesProvider.readCategories();
  }

}
