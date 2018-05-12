import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Task } from '../../models/task';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {
  public task: Task;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = this.navParams.get('task');
  }

}
