import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Task } from '../../models/task';

import { TaskUpdatePage } from '../task-update/task-update';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {
  public task: Task;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.task = this._navParams.get('task');
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(TaskUpdatePage, { task: this.task });
  }

}
