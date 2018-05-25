import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from '../common/common';
import { Category } from '../../models/category';

@Injectable()
export class CategoriesProvider {
  private _categories = new BehaviorSubject<Array<Category>>([]);

  constructor(private _commonProvider: CommonProvider) {
  }

  public get categories() {
    return this._categories;
  }

  public readCategories(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._commonProvider.performRequest('categories/', 'GET').subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          this._categories.next(jsonConvert.deserializeArray(data.results, Category));
          resolve();
        },
        error => {
          reject();
        }
      );
    });
  }

}
