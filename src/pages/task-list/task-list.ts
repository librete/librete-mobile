import { Component } from '@angular/core';
import { AlertController, ItemSliding, NavController } from 'ionic-angular';

import { Task } from '../../models/task';

import { TaskDetailPage } from '../task-detail/task-detail';
import { TaskCreatePage } from '../task-create/task-create';
import { TaskUpdatePage } from '../task-update/task-update';

import { CommonProvider } from '../../providers/common/common';
import { TasksProvider } from '../../providers/tasks/tasks';

@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  public orderBy = 'createdAt';
  public orderType = 'ascending';

  constructor(
    private _alertCtrl: AlertController,
    private _navCtrl: NavController,
    private _commonProvider: CommonProvider,
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

  public navigateToUpdatePage(task: Task, item: ItemSliding) {
    this._navCtrl.push(TaskUpdatePage, { task: task });
    item.close();
  }

  public deleteTask(task) {
    const confirm = this._alertCtrl.create({
      title: 'Are you sure?',
      message: `Are you sure that you want to delete "${task.name}"`,
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this._tasksProvider.deleteTask(task.url);
          }
        }
      ]
    });
    confirm.present();
  }

  public sortTasks() {
    this._commonProvider.sort(this.tasks, this.orderBy, this.orderType === 'ascending');
  }

}
