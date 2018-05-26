import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { TaskCreatePage } from './task-create';

import { CommonProvider } from '../../providers/common/common';
import { TasksProvider } from '../../providers/tasks/tasks';
import { CategoriesProvider } from '../../providers/categories/categories';

class NavControllerStub {}
class CommonProviderStub {}
class TasksProviderStub {}
class CategoriesProviderStub {}

let component: TaskCreatePage;
let fixture: ComponentFixture<TaskCreatePage>;

describe('Pages: TaskCreatePage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCreatePage],
      imports: [TranslateModule.forRoot()],
      providers: [
        DatePipe,
        FormBuilder,
        { provide: NavController, useClass: NavControllerStub },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: TasksProvider, useClass: TasksProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreatePage);
    component = fixture.componentInstance;
  });

  function updateForm(data) {
    component.name.setValue(data.name);
    component.category.setValue(data.category);
    component.startDate.setValue(data.startDate);
    component.endDate.setValue(data.endDate);
    component.description.setValue(data.description);
    component.priority.setValue(data.priority);
  }

  it('Should be valid', () => {
    const date = new Date().toISOString().substr(0, 10);

    const data = {
      name: 'Task name',
      category: 'https://example.com/api/categories/1/',
      startDate: date,
      endDate: date,
      description: 'Description',
      priority: 'Priority'
    };

    updateForm(data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(data);
  });

  it('Should be invalid due to missing required fields', () => {
    expect(component.form.valid).toBeFalsy();
    expect(component.name.errors['required']).toBeTruthy();
    expect(component.category.errors['required']).toBeTruthy();
  });

  it('Should be invalid due to dates in the past', () => {
    const dateObject = new Date();
    dateObject.setDate(dateObject.getDate() - 1);
    const date = dateObject.toISOString().substr(0, 10);

    const data = {
      name: 'Task name',
      category: 'https://example.com/api/categories/1/',
      startDate: date,
      endDate: date,
      description: 'Description',
      priority: 'Priority'
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
      name: 'Task name',
      category: 'https://example.com/api/categories/1/',
      startDate: startDate,
      endDate: endDate,
      description: 'Description',
      priority: 'Priority'
    };

    updateForm(data);

    expect(component.form.valid).toBeFalsy();
    expect(component.form.errors['swappedDates']).toBeTruthy();
  });

});
