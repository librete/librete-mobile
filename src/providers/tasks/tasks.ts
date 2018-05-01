import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { Task } from './../../models/task';

@Injectable()
export class TasksProvider {
  private _tasks = new BehaviorSubject<Array<Task>>([]);


  constructor(private commonProvider: CommonProvider) {
  }

  get tasks() {
    return this._tasks;
  }

  public updateTasks(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getTasks().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          this._tasks.next(jsonConvert.deserializeArray(data.results, Task));
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
