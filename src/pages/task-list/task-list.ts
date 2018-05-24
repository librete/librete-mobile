import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Task } from '../../models/task';

import { TaskDetailPage } from '../task-detail/task-detail';
import { TaskCreatePage } from '../task-create/task-create';

import { TasksProvider } from '../../providers/tasks/tasks';

@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  constructor(
    private _navCtrl: NavController,
    private _tasksProvider: TasksProvider
  ) {
    _tasksProvider.readTasks();

  }
  public get tasks() {
    return this._tasksProvider.tasks.getValue();
  }

  public navigateToDetailPage(task: Task) {
    this._navCtrl.push(TaskDetailPage, { task: task });
  }

  public navigateToCreatePage() {
    this._navCtrl.push(TaskCreatePage);
  }

}
