import { Component } from '@angular/core';

import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  constructor(private _categoriesProvider: CategoriesProvider) {
    _categoriesProvider.readCategories();
  }

  public get categories() {
    return this._categoriesProvider.categories.getValue();
  }

}
