import { TestBed, inject } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { CommonProvider } from '../common/common';
import { CategoriesProvider } from '../categories/categories';
import { TasksProvider } from './tasks';

import { Category } from '../../models/category';
import { Task } from '../../models/task';

const getTasksResponse = {
  'results': [
    {
      url: 'https://example.com/api/tasks/1/',
      name: 'Task name',
      author: 'https://example.com/api/authors/1/',
      category: 'https://example.com/api/categories/1/',
      parent: '',
      start_date: '2018-04-02T01:00:00Z',
      end_date: '2018-04-20T01:00:00Z',
      created_at: '2018-04-01T06:23:05.288858Z',
      updated_at: '2018-04-01T06:23:05.288906Z',
      status: 'Status',
      priority: 'Priority',
      description: 'Description'
    },
    {
      url: 'https://example.com/api/tasks/2/',
      name: 'Task name 2',
      author: 'https://example.com/api/authors/1/',
      category: 'https://example.com/api/categories/2/',
      parent: 'https://example.com/api/tasks/1/',
      start_date: '2018-04-02T04:00:00Z',
      end_date: '2018-04-20T04:00:00Z',
      created_at: '2018-04-01T06:26:01.288858Z',
      updated_at: '2018-04-01T06:26:01.288858Z',
      status: 'Status',
      priority: 'Priority',
      description: 'Description'
    }
  ]
};

class CommonProviderStub {

  public performRequest(relativeUrl: string,
    requestMethod: string,
    requestData?: object | HttpParams): Observable<Object> {
    return Observable.of(getTasksResponse);
  }
}

class CategoriesProviderStub {

  public get categories() {
    const categoryList: Array<Category> = [this._createCategory(1), this._createCategory(2)];
    return new BehaviorSubject<Array<Category>>(categoryList);
  }

  private _createCategory(id) {
    const category = new Category();
    category.url = `https://example.com/api/categories/${id}/`;
    category.name = `Category ${id}`;
    return category;
  }
}


describe('Providers: TasksProvider', () => {
  let provider;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TasksProvider,
      { provide: CommonProvider, useClass: CommonProviderStub },
      { provide: CategoriesProvider, useClass: CategoriesProviderStub },
    ]
  }));

  beforeEach(inject([TasksProvider], _tasksProvider => {
    provider = _tasksProvider;
  }));


  it('Should update tasks', (done) => {

    provider.readTasks().then(
      data => {
        const tasks = provider.tasks.getValue();
        expect(tasks.length).toBe(getTasksResponse.results.length);
        for (const task of tasks) {
          expect(task).toEqual(jasmine.any(Task));
          expect(task.category).toEqual(jasmine.any(Category));
          expect(task.categoryUrl).toEqual(task.category.url);
        }
        done();
      }
    );

  });

});
