import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TaskDetailPage } from '../task-detail/task-detail';

import { CommonProvider } from '../../providers/common/common';
import { TasksProvider } from '../../providers/tasks/tasks';
import { CategoriesProvider } from '../../providers/categories/categories';

import { DateValidators } from '../../validators/date';

@Component({
  selector: 'page-task-create',
  templateUrl: 'task-create.html',
})
export class TaskCreatePage {
  public form: FormGroup;
  public maxDate: string;
  public minDate: string;
  public isSubmitted = false;

  constructor(
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _commonProvider: CommonProvider,
    private _tasksProvider: TasksProvider,
    private _categoriesProvider: CategoriesProvider
  ) {
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

  public get status() {
    return this.form.get('status');
  }

  public createTask() {
    this.isSubmitted = true;
    this._tasksProvider.createTask(this.form.value).then(
      data => {
        this._navCtrl.push(TaskDetailPage, {'task': data});
      },
      error => {
        for (const key in error.error) {
          const formKey = this._commonProvider.toCamelCase(key);
          if (this.form.get(formKey)) {
            this.form.get(formKey).setErrors({remote: error.error[key]});
          }
        }
      }
    );
  }

  private _createForm() {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      startDate: ['', [DateValidators.pastDate]],
      endDate: ['', [DateValidators.pastDate]],
      description: '',
      priority: '',
    }, { validator: DateValidators.swappedDates('startDate', 'endDate') });
  }

}
