import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController, NavParams } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { CategoryDetailPage } from './category-detail';
import { Category } from '../../models/category';

const category = new Category();

class NavControllerStub {
  push(page, param) {
    return null;
  }
}

class NavParamsStub {
  get(key) {
    return category;
  }
}

describe('Pages: CategoryDetailPage', () => {
  let component: CategoryDetailPage;
  let fixture: ComponentFixture<CategoryDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryDetailPage],
      imports: [TranslateModule.forRoot()],
      providers: [
        DatePipe,
        { provide: NavController, useClass: NavControllerStub },
        { provide: NavParams, useClass: NavParamsStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  it('Should be created', () => {
    fixture = TestBed.createComponent(CategoryDetailPage);
    component = fixture.componentInstance;

    expect(component instanceof CategoryDetailPage).toBe(true);
  });

  it('Should navigate to update page', () => {
    const navController = new NavControllerStub();
    TestBed.overrideProvider(NavController, { useValue: navController });
    fixture = TestBed.createComponent(CategoryDetailPage);
    component = fixture.componentInstance;
    const spy = spyOn(navController, 'push');

    component.navigateToUpdatePage();

    expect(spy).toHaveBeenCalled();
  });

});
