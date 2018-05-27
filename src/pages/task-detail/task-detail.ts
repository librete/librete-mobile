import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';

import { Task } from '../../models/task';

import { TaskUpdatePage } from '../task-update/task-update';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {
  public task: Task;
  public translationParams = {
    startDate: {},
    endDate: {},
    createdAt: {},
    updatedAt: {}
  };

  constructor(
    private _datePipe: DatePipe,
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.task = this._navParams.get('task');

    this.translationParams.startDate = this._formatDate(this.task.startDate);
    this.translationParams.endDate = this._formatDate(this.task.endDate);
    this.translationParams.createdAt = this._formatDate(this.task.createdAt);
    this.translationParams.updatedAt = this._formatDate(this.task.updatedAt);
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(TaskUpdatePage, { task: this.task });
  }

  private _formatDate(date: Date): object {
    const dateFormat = 'dd.MM';
    const timeFormat = 'HH:mm';

    return {
      date: this._datePipe.transform(date, dateFormat),
      time: this._datePipe.transform(date, timeFormat),
    };
  }

}
