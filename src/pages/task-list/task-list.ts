import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TasksProvider } from './../../providers/tasks/tasks';

@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private tasksProvider: TasksProvider) {

      tasksProvider.updateTasks();
    }

    get tasks() {
      return this.tasksProvider.tasks.getValue();
    }
}
