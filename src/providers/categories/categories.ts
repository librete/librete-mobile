import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { Category } from './../../models/category';

@Injectable()
export class CategoriesProvider {
  private _categories = new BehaviorSubject<Array<Category>>([]);

  constructor(private commonProvider: CommonProvider) {
  }

  get categories() {
    return this._categories;
  }

  public updateCategories(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getCategories().subscribe(
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

  private getCategories() {
    return this.commonProvider.performRequest('categories/', 'GET');
  }

}
