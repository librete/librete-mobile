import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { CategoryCreatePage } from './category-create';

import { CommonProvider } from '../../providers/common/common';
import { CategoriesProvider } from '../../providers/categories/categories';

class NavControllerStub {}
class CommonProviderStub {}
class CategoriesProviderStub {}

let component: CategoryCreatePage;
let fixture: ComponentFixture<CategoryCreatePage>;

describe('Pages: CategoryCreatePage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryCreatePage],
      imports: [TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: NavController, useClass: NavControllerStub },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreatePage);
    component = fixture.componentInstance;
  });

  function updateForm(data) {
    component.name.setValue(data.name);
  }

  it('Should be valid', () => {
    const date = new Date().toISOString().substr(0, 10);

    const data = {
      name: 'Category name',
    };

    updateForm(data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(data);
  });

  it('Should be invalid due to missing required fields', () => {
    expect(component.form.valid).toBeFalsy();
    expect(component.name.errors['required']).toBeTruthy();
  });

});
