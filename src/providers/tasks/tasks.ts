import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { CategoriesProvider } from './../categories/categories';
import { Task } from './../../models/task';

@Injectable()
export class TasksProvider {
  private _tasks = new BehaviorSubject<Array<Task>>([]);


  constructor(private commonProvider: CommonProvider,
    private categoriesProvider: CategoriesProvider) {
  }

  get tasks() {
    return this._tasks;
  }

  public updateTasks(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getTasks().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const tasks: Array<Task> = jsonConvert.deserializeArray(data.results, Task);
          for (const task of tasks) {
            task.category = this.categoriesProvider.categories.getValue().filter(
              category => category.url === task.categoryUrl
            )[0];
          }
          this._tasks.next(tasks);
          resolve();
        },
        error => {
          reject();
        }
      );
    });
  }

  private getTasks() {
    return this.commonProvider.performRequest('tasks/', 'GET');
  }
}
