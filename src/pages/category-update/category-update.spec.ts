import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { Category } from '../../models/category';

import { CategoryUpdatePage } from './category-update';

import { CommonProvider } from '../../providers/common/common';
import { CategoriesProvider } from '../../providers/categories/categories';

const date = new Date().toISOString().substr(0, 10);
const category = {
  name: 'Category name',
};

class NavControllerStub {}
class NavParamsStub {
  public get(key): any {
    return Object.assign({}, category);
  }
}
class CommonProviderStub {}
class CategoriesProviderStub {}

let component: CategoryUpdatePage;
let fixture: ComponentFixture<CategoryUpdatePage>;

describe('Pages: CategoryUpdatePage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryUpdatePage],
      imports: [TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: NavController, useClass: NavControllerStub },
        { provide: NavParams, useClass: NavParamsStub },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryUpdatePage);
    component = fixture.componentInstance;
    this.category = Object.assign({}, category);
  });

  function updateForm(data, allowEmpty = false) {
    for (const key in data) {
      if (data[key] || allowEmpty) {
        component.form.get(key).setValue(data[key]);
      }
    }
  }

  it('Should be valid', () => {
    expect(component.form.valid).toBeTruthy();
  });

  it('Should be filled with initial data', () => {
    const formValue = this.category;

    expect(component.form.value).toEqual(formValue);
  });

  it('Should be valid after update', () => {
    const data = {
      name: 'New category name',
    };

    updateForm(data);

    let formValue = this.category;
    formValue = Object.assign(formValue, data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(formValue);
  });

  it('Should be invalid due to missing required fields', () => {
    const data = {
      name: '',
    };

    updateForm(data, true);

    expect(component.form.valid).toBeFalsy();
    expect(component.name.errors['required']).toBeTruthy();
  });

});
