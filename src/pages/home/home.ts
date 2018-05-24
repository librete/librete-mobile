import { Component } from '@angular/core';

import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(_categoriesProvider: CategoriesProvider) {
    _categoriesProvider.readCategories();
  }

}
