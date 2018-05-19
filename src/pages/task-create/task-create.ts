import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { TaskDetailPage } from './../task-detail/task-detail';

import { CommonProvider } from '../../providers/common/common';
import { TasksProvider } from '../../providers/tasks/tasks';
import { CategoriesProvider } from '../../providers/categories/categories';

import { DateValidators } from './../../validators/date';

@Component({
  selector: 'page-task-create',
  templateUrl: 'task-create.html',
})
export class TaskCreatePage {
  public form: FormGroup;
  public maxDate: string;
  public minDate: string;
  public isSubmitted = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private commonProvider: CommonProvider,
    private tasksProvider: TasksProvider,
    private categoriesProvider: CategoriesProvider,
    private datePipe: DatePipe
  ) {
    this.createForm();

    const minDateObject = new Date();
    const maxDateObject = new Date();
    maxDateObject.setFullYear(maxDateObject.getFullYear() + 10);
    this.minDate = this.datePipe.transform(minDateObject, 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(maxDateObject, 'yyyy-MM-dd');
  }

  public get statusOptions() {
    return this.tasksProvider.statusOptions;
  }

  public get priorityOptions() {
    return this.tasksProvider.priorityOptions;
  }

  public get categories() {
    return this.categoriesProvider.categories.getValue();
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
    this.tasksProvider.createTask(this.form.value).then(
      data => {
        this.navCtrl.push(TaskDetailPage, {'task': data});
      },
      error => {
        for (const key in error.error) {
          const formKey = this.commonProvider.toCamelCase(key);
          if (this.form.get(formKey)) {
            this.form.get(formKey).setErrors({remote: error.error[key]});
          }
        }
      }
    );
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      startDate: ['', [DateValidators.pastDate]],
      endDate: ['', [DateValidators.pastDate]],
      description: '',
      priority: '',
    }, { validator: DateValidators.swappedDates('startDate', 'endDate') });
  }

}
