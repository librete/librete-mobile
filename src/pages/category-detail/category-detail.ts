import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';

import { Category } from '../../models/category';

import { CategoryUpdatePage } from './../category-update/category-update';

@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {
  public category: Category;
  public translationParams = {
    createdAt: {},
    updatedAt: {}
  };

  constructor(
    private _datePipe: DatePipe,
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.category = this._navParams.get('category');

    this.translationParams.createdAt = this._formatDate(this.category.createdAt);
    this.translationParams.updatedAt = this._formatDate(this.category.updatedAt);
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(CategoryUpdatePage, { category: this.category });
  }

  private _formatDate(date: Date): object {
    const dateFormat = 'dd.MM';
    const timeFormat = 'HH:mm';

    return {
      date: this._datePipe.transform(date, dateFormat),
      time: this._datePipe.transform(date, timeFormat),
    };
  }

}
