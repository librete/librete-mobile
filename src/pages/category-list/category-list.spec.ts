
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AlertController, NavController, ItemSliding, Alert } from 'ionic-angular';

import { BehaviorSubject } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { CategoryListPage } from './category-list';
import { Category } from '../../models/category';
import { CategoriesProvider } from '../../providers/categories/categories';

const category = new Category();

class NavControllerStub {
  push(page, param) {
    return null;
  }
}

class AlertControllerStub {
  create(params) {
    return {
      present() {
        return null;
      }
    };
  }
}

class CategoriesProviderStub {
    readCategories() {
      return null;
    }

    deleteCategory(url) {
      return null;
    }

    categories = new BehaviorSubject([
        new Category()
    ]);
}

describe('Pages: CategoryListPage', () => {
  let component: CategoryListPage;
  let fixture: ComponentFixture<CategoryListPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryListPage],
      imports: [TranslateModule.forRoot()],
      providers: [
        DatePipe,
        { provide: NavController, useClass: NavControllerStub },
        { provide: AlertController, useClass: AlertControllerStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  it('Should be created', () => {
    fixture = TestBed.createComponent(CategoryListPage);
    component = fixture.componentInstance;

    expect(component instanceof CategoryListPage).toBe(true);
  });

  it('Should navigate to detail page', () => {
    const navController = new NavControllerStub();
    TestBed.overrideProvider(NavController, { useValue: navController });
    fixture = TestBed.createComponent(CategoryListPage);
    component = fixture.componentInstance;
    const spy = spyOn(navController, 'push');

    component.navigateToDetailPage(category);

    expect(spy).toHaveBeenCalled();
  });

  it('Should navigate to create page', () => {
    const navController = new NavControllerStub();
    TestBed.overrideProvider(NavController, { useValue: navController });
    fixture = TestBed.createComponent(CategoryListPage);
    component = fixture.componentInstance;
    const spy = spyOn(navController, 'push');

    component.navigateToCreatePage();

    expect(spy).toHaveBeenCalled();
  });

  it('Should navigate to update page', () => {
    const navController = new NavControllerStub();
    TestBed.overrideProvider(NavController, { useValue: navController });
    fixture = TestBed.createComponent(CategoryListPage);
    component = fixture.componentInstance;
    const spy = spyOn(navController, 'push');

    class FakeItemSliding {
      close() {
        return null;
      }
    }

    component.navigateToUpdatePage(category, new FakeItemSliding() as ItemSliding);

    expect(spy).toHaveBeenCalled();
  });

  fit('Should prompt before deleting a category', () => {
    const alertController = new AlertControllerStub();
    TestBed.overrideProvider(AlertController, { useValue: alertController });
    fixture = TestBed.createComponent(CategoryListPage);
    component = fixture.componentInstance;
    const spy = spyOn(alertController, 'create');

    component.deleteCategory(category);

    expect(spy).toHaveBeenCalled();
  });

});
