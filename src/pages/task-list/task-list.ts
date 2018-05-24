import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

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
    private _alertCtrl: AlertController,
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

}
