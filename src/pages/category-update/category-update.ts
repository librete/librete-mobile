import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Category } from '../../models/category';

import { CommonProvider } from '../../providers/common/common';
import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-category-update',
  templateUrl: 'category-update.html',
})
export class CategoryUpdatePage {
  public category: Category;
  public form: FormGroup;
  public isSubmitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _commonProvider: CommonProvider,
    private _categoriesProvider: CategoriesProvider,
  ) {
    this.category = this._navParams.get('category');
    this._createForm();
  }

  public get categories() {
    return this._categoriesProvider.categories.getValue();
  }

  public get name() {
    return this.form.get('name');
  }

  public updateCategory() {
    this.isSubmitted = true;
    this._categoriesProvider.updateCategory(this.category.url, this.form.value).then(
      data => {
        this._navCtrl.pop();
      },
      error => {
        for (let key in error.error) {
          key = this._commonProvider.toCamelCase(key);
          if (this.form.get(key)) {
            this.form.get(key).setErrors({
              remote: error.error[key]
            });
          }
        }
      }
    );
  }

  private _createForm() {
    this.form = this._formBuilder.group({
      name: [this.category.name, [Validators.required]],
    });
  }

}
