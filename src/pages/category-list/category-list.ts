import { Component } from '@angular/core';
import { ItemSliding, NavController } from 'ionic-angular';

import { Category } from '../../models/category';

import { CategoryDetailPage } from '../category-detail/category-detail';
import { CategoryCreatePage } from '../category-create/category-create';
import { CategoryUpdatePage } from '../category-update/category-update';

import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  constructor(
    private _navCtrl: NavController,
    private _categoriesProvider: CategoriesProvider
  ) {
    _categoriesProvider.readCategories();
  }

  public get categories() {
    return this._categoriesProvider.categories.getValue();
  }

  public navigateToDetailPage(category: Category) {
    this._navCtrl.push(CategoryDetailPage, { category: category });
  }

  public navigateToCreatePage() {
    this._navCtrl.push(CategoryCreatePage);
  }

  public navigateToUpdatePage(category: Category, item: ItemSliding) {
    this._navCtrl.push(CategoryUpdatePage, { category: category });
    item.close();
  }

}
