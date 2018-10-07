import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { CategoryCreatePage } from './category-create';

import { CommonProvider } from '../../providers/common/common';
import { CategoriesProvider } from '../../providers/categories/categories';

class NavControllerStub {
  public push() {
    return null;
  }
}
class CommonProviderStub {
  toCamelCase(key) {
    return key;
  }
}
class CategoriesProviderStub {
  succeed = true;
  createCategory() {
    return new Promise((resolve, reject) => {
      if (this.succeed) {
        resolve();
      } else {
        reject({
          'error': {
            'name': ['Invalid name']
          }
        });
      }
    });
  }
}

let component: CategoryCreatePage;
let fixture: ComponentFixture<CategoryCreatePage>;

describe('Pages: CategoryCreatePage', () => {
  let navCtrl;

  beforeEach(() => {
    navCtrl = new NavControllerStub();
    TestBed.configureTestingModule({
      declarations: [CategoryCreatePage],
      imports: [TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: NavController, useValue: navCtrl },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  function updateForm(data) {
    component.name.setValue(data.name);
  }

  it('Should be valid', () => {
    fixture = TestBed.createComponent(CategoryCreatePage);
    component = fixture.componentInstance;

    const date = new Date().toISOString().substr(0, 10);

    const data = {
      name: 'Category name',
    };

    updateForm(data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(data);
  });

  it('Should be invalid due to missing required fields', () => {
    fixture = TestBed.createComponent(CategoryCreatePage);
    component = fixture.componentInstance;

    expect(component.form.valid).toBeFalsy();
    expect(component.name.errors['required']).toBeTruthy();
  });

  it('Should change isSubmitted to true', (done) => {
    fixture = TestBed.createComponent(CategoryCreatePage);
    component = fixture.componentInstance;

    const date = new Date().toISOString().substr(0, 10);

    const data = {
      name: 'Category name',
    };

    updateForm(data);
    component.createCategory().then(
      data => {
        expect(component.isSubmitted).toBeTruthy();
        expect(component.name.valid).toBeTruthy();
        done();
      }
    );
  });

  it('Should change isSubmitted to false', (done) => {
    const categoriesProvider = new CategoriesProviderStub();
    categoriesProvider.succeed = false;
    TestBed.overrideProvider(CategoriesProvider, { useValue: categoriesProvider });

    fixture = TestBed.createComponent(CategoryCreatePage);
    component = fixture.componentInstance;

    const date = new Date().toISOString().substr(0, 10);

    const data = {
      name: 'Category name',
    };

    updateForm(data);
    component.createCategory().then(
      data => {
        expect(component.isSubmitted).toBeTruthy();
        expect(component.name.valid).toBeFalsy();
        expect(component.name.errors).toEqual({remote: ['Invalid name']});
        done();
      }
    );

  });
});
