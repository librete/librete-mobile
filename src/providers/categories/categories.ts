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

  public createCategory(data: any) {
    return new Promise((resolve, reject) => {
      this._commonProvider.performRequest('categories/', 'POST', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const category: Category = jsonConvert.deserialize(data, Category);
          const categories: Array<Category> = this._categories.getValue();
          categories.push(category);
          resolve(category);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public updateCategory(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this._commonProvider.performRequest(url, 'PUT', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const category: Category = jsonConvert.deserialize(data, Category);
          const categories: Array<Category> = this._categories.getValue();
          const index = categories.findIndex(x => x.url === url);

          categories[index] = Object.assign(categories[index], category);

          resolve(category);
        },
        error => {
          reject(error);
        }
      );
    });
  }

}
