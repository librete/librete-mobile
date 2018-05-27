import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from '../common/common';
import { CategoriesProvider } from '../categories/categories';
import { Task } from '../../models/task';

@Injectable()
export class TasksProvider {
  private _tasks = new BehaviorSubject<Array<Task>>([]);

  constructor(
    private _commonProvider: CommonProvider,
    private _categoriesProvider: CategoriesProvider
  ) { }

  public get tasks() {
    return this._tasks;
  }

  public readTasks(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._commonProvider.performRequest('tasks/', 'GET').subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const tasks: Array<Task> = jsonConvert.deserializeArray(data.results, Task);
          for (const task of tasks) {
            this._setCategory(task);
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

  public createTask(data: any) {
    return new Promise((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this._commonProvider.performRequest('tasks/', 'POST', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const task: Task = jsonConvert.deserialize(data, Task);
          const tasks: Array<Task> = this._tasks.getValue();
          this._setCategory(task);
          tasks.push(task);
          resolve(task);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public updateTask(url: string, data: any) {
    return new Promise((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this._commonProvider.performRequest(url, 'PUT', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const task: Task = jsonConvert.deserialize(data, Task);
          const tasks: Array<Task> = this._tasks.getValue();
          const index = tasks.findIndex(x => x.url === url);

          this._setCategory(task);
          tasks[index] = Object.assign(tasks[index], task);

          resolve(task);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public deleteTask(url: string) {
    return new Promise((resolve, reject) => {
      this._commonProvider.performRequest(url, 'DELETE').subscribe(
        (data: any) => {
          const tasks: Array<Task> = this._tasks.getValue();
          const index = tasks.findIndex(x => x.url === url);
          tasks.splice(index, 1);
          resolve();
        },
        error => {
          reject(error);
        }
      );
    });
  }

  private _setCategory(task) {
    task.category = this._categoriesProvider.categories.getValue().find(
      category => category.url === task.categoryUrl
    );
  }

}
