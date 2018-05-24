import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Task } from '../../models/task';

import { TaskUpdatePage } from './task-update';

import { CommonProvider } from '../../providers/common/common';
import { TasksProvider } from '../../providers/tasks/tasks';
import { CategoriesProvider } from '../../providers/categories/categories';

const date = new Date().toISOString().substr(0, 10);
const task = {
  name: 'Task name',
  categoryUrl: 'https://example.com/api/categories/1/',
  startDate: date,
  endDate: date,
  description: 'Description',
  priority: 'High'
};

class NavControllerStub {}
class NavParamsStub {
  public get(key): any {
    return Object.assign({}, task);
  }
}
class CommonProviderStub {}
class TasksProviderStub {}
class CategoriesProviderStub {}

let component: TaskUpdatePage;
let fixture: ComponentFixture<TaskUpdatePage>;

describe('Pages: TaskUpdatePage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskUpdatePage],
      providers: [
        DatePipe,
        FormBuilder,
        { provide: NavController, useClass: NavControllerStub },
        { provide: NavParams, useClass: NavParamsStub },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: TasksProvider, useClass: TasksProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUpdatePage);
    component = fixture.componentInstance;
    this.task = Object.assign({}, task);
  });

  function updateForm(data, allowEmpty = false) {
    for (const key in data) {
      if (data[key] || allowEmpty) {
        component.form.get(key).setValue(data[key]);
      }
    }
  }

  function convertToFormValue(data) {
    data.category = data.categoryUrl;
    delete data.categoryUrl;
    return data;
  }

  it('Should be valid', () => {
    expect(component.form.valid).toBeTruthy();
  });

  it('Should be filled with initial data', () => {
    const formValue = convertToFormValue(this.task);

    expect(component.form.value).toEqual(formValue);
  });

  it('Should be valid after update', () => {
    const data = {
      name: 'New task name',
      category: 'https://example.com/api/categories/2/',
      description: 'New description',
      priority: 'Low'
    };

    updateForm(data);

    let formValue = convertToFormValue(this.task);
    formValue = Object.assign(formValue, data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(formValue);
  });

  it('Should be invalid due to missing required fields', () => {
    const data = {
      name: '',
      category: '',
      startDate: '',
      endDate: '',
    };

    updateForm(data, true);

    expect(component.form.valid).toBeFalsy();
    expect(component.name.errors['required']).toBeTruthy();
    expect(component.category.errors['required']).toBeTruthy();
    expect(component.startDate.errors['required']).toBeTruthy();
    expect(component.endDate.errors['required']).toBeTruthy();
  });

  it('Should be invalid due to dates in the past', () => {
    const dateObject = new Date();
    dateObject.setDate(dateObject.getDate() - 1);
    const date = dateObject.toISOString().substr(0, 10);

    const data = {
      startDate: date,
      endDate: date
    };

    updateForm(data);

    expect(component.form.valid).toBeFalsy();
    expect(component.startDate.errors['pastDate']).toBeTruthy();
    expect(component.endDate.errors['pastDate']).toBeTruthy();
  });

  it('Should be invalid due to swapped dates', () => {
    const dateObject = new Date();
    const endDate = dateObject.toISOString().substr(0, 10);
    dateObject.setDate(dateObject.getDate() + 1);
    const startDate = dateObject.toISOString().substr(0, 10);

    const data = {
      startDate: startDate,
      endDate: endDate
    };

    updateForm(data);

    expect(component.form.valid).toBeFalsy();
    expect(component.form.errors['swappedDates']).toBeTruthy();
  });

});
