import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { CategoriesProvider } from './../categories/categories';
import { Task } from './../../models/task';

@Injectable()
export class TasksProvider {
  public statusOptions = [
    { name: 'active', label: 'Active'},
    { name: 'finished', label: 'Finished'}
  ];
  public priorityOptions = [
    { name: 'high', label: 'High' },
    { name: 'medium', label: 'Medium'},
    { name: 'low', label: 'Low'}
  ];
  private _tasks = new BehaviorSubject<Array<Task>>([]);

  constructor(private commonProvider: CommonProvider,
    private categoriesProvider: CategoriesProvider) {
  }

  get tasks() {
    return this._tasks;
  }

  public updateTask(url: string, data: any) {
    return new Promise ((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this.commonProvider.performRequest(url, 'PUT', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const task: Task = jsonConvert.deserialize(data, Task);
          const tasks: Array<Task> = this._tasks.getValue();
          const index = tasks.findIndex(x => x.url === url);

          this.setCategory(task);
          tasks[index] = Object.assign(tasks[index], task);

          resolve(task);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public createTask(data: any) {
    return new Promise ((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this.commonProvider.performRequest('tasks/', 'POST', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const task: Task = jsonConvert.deserialize(data, Task);
          const tasks: Array<Task> = this._tasks.getValue();
          this.setCategory(task);
          tasks.push(task);
          resolve(task);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public updateTasks(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getTasks().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const tasks: Array<Task> = jsonConvert.deserializeArray(data.results, Task);
          for (const task of tasks) {
            this.setCategory(task);
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

  private setCategory(task) {
    task.category = this.categoriesProvider.categories.getValue().filter(
      category => category.url === task.categoryUrl
    )[0];
  }
}
