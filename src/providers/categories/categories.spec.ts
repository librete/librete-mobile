import { TestBed, inject } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { CommonProvider } from './../common/common';
import { CategoriesProvider } from './categories';
import { Category } from './../../models/category';

const getCategoriesResponse = {
  'results': [
    {
      'url': 'https://example.com/api/categories/1/',
      'name': 'Category name',
      'author': 'https://example.com/api/authors/1/',
      'events': ['https://example.com/api/tasks/1/'],
      'notes': ['https://example.com/api/notes/1/'],
      'tasks': ['https://example.com/api/tasks/1/'],
      'description': 'Description',
      'created_at': '2018-04-01T06:23:05.288858Z',
      'updated_at': '2018-04-01T06:23:05.288906Z',
    },
    {
      'url': 'https://example.com/api/categories/2/',
      'name': 'Category name 2',
      'author': 'https://example.com/api/authors/2/',
      'events': ['https://example.com/api/tasks/1/'],
      'notes': ['https://example.com/api/notes/2/'],
      'tasks': ['https://example.com/api/tasks/2/'],
      'description': 'Description 2',
      'created_at': '2018-04-01T06:23:05.288858Z',
      'updated_at': '2018-04-01T06:23:05.288906Z',
    }
  ]
};

class CommonProviderStub {

  public performRequest(relativeUrl: string,
    requestMethod: string,
    requestData?: object | HttpParams): Observable<Object> {
    return Observable.of(getCategoriesResponse);
  }
}

describe('Providers: CategoriesProvider', () => {
  let provider;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CategoriesProvider,
      { provide: CommonProvider, useClass: CommonProviderStub },
    ]
  }));

  beforeEach(inject([CategoriesProvider], categoriesProvider => {
    provider = categoriesProvider;
  }));


  it('Should update categories', (done) => {

    provider.updateCategories().then(
      data => {
        const categories = provider.categories.getValue();
        expect(categories.length).toBe(getCategoriesResponse.results.length);
        for (const category of categories) {
          expect(category).toEqual(jasmine.any(Category));
        }
        done();
      }
    );

  });

});
