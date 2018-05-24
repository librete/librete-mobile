import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Task } from '../../models/task';

import { CommonProvider } from '../../providers/common/common';
import { TasksProvider } from '../../providers/tasks/tasks';
import { CategoriesProvider } from '../../providers/categories/categories';

import { DateValidators } from '../../validators/date';

@Component({
  selector: 'page-task-update',
  templateUrl: 'task-update.html',
})
export class TaskUpdatePage {
  public task: Task;
  public form: FormGroup;
  public maxDate: string;
  public minDate: string;
  public isSubmitted = false;

  constructor(
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _commonProvider: CommonProvider,
    private _tasksProvider: TasksProvider,
    private _categoriesProvider: CategoriesProvider
  ) {
    this.task = this._navParams.get('task');
    this._createForm();

    const minDateObject = new Date();
    const maxDateObject = new Date();
    maxDateObject.setFullYear(maxDateObject.getFullYear() + 10);
    this.minDate = this._datePipe.transform(minDateObject, 'yyyy-MM-dd');
    this.maxDate = this._datePipe.transform(maxDateObject, 'yyyy-MM-dd');
  }

  public get priorityOptions() {
    return this._tasksProvider.priorityOptions;
  }

  public get categories() {
    return this._categoriesProvider.categories.getValue();
  }

  public get name() {
    return this.form.get('name');
  }

  public get category() {
    return this.form.get('category');
  }

  public get startDate() {
    return this.form.get('startDate');
  }

  public get endDate() {
    return this.form.get('endDate');
  }

  public get description() {
    return this.form.get('description');
  }

  public get priority() {
    return this.form.get('priority');
  }

  public updateTask() {
    this.isSubmitted = true;
    this._tasksProvider.updateTask(this.task.url, this.form.value).then(
      data => {
        this._navCtrl.pop();
      },
      error => {
        for (let key in error.error) {
          key = this._commonProvider.toCamelCase(key);
          if (this.form.get(key)) {
            this.form.get(key).setErrors({
              remote: error.error[key]
            });
          }
        }
      }
    );
  }

  private _createForm() {
    this.form = this._formBuilder.group({
      name: [this.task.name, [Validators.required]],
      category: [this.task.categoryUrl, [Validators.required]],
      startDate: [this.task.startDate, [Validators.required, DateValidators.pastDate]],
      endDate: [this.task.endDate, [Validators.required, DateValidators.pastDate]],
      description: this.task.description,
      priority: this.task.priority,
    }, { validator: DateValidators.swappedDates('startDate', 'endDate') });
  }

}
