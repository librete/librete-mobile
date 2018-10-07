import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { CategoryDetailPage } from '../category-detail/category-detail';

import { CommonProvider } from '../../providers/common/common';
import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-category-create',
  templateUrl: 'category-create.html',
})
export class CategoryCreatePage {
  public form: FormGroup;
  public isSubmitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _commonProvider: CommonProvider,
    private _categoriesProvider: CategoriesProvider,
  ) {
    this._createForm();
  }

  public get name() {
    return this.form.get('name');
  }

  public createCategory(): Promise<boolean> {
    return new Promise(resolve => {
      this.isSubmitted = true;
      this._categoriesProvider.createCategory(this.form.value).then(
        data => {
          this._navCtrl.push(CategoryDetailPage, {'category': data});
          resolve();
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
          resolve();
        }
      );
    });
  }

  private _createForm() {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

}
