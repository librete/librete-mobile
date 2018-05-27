import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { SignInPage } from './sign-in';

import { CommonProvider } from '../../providers/common/common';
import { AuthProvider } from '../../providers/auth/auth';

class NavControllerStub {}
class CommonProviderStub {}
class AuthProviderStub {}

let component: SignInPage;
let fixture: ComponentFixture<SignInPage>;

describe('Pages: SignInPage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInPage],
      imports: [TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: NavController, useClass: NavControllerStub },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: AuthProvider, useClass: AuthProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
  });

  function updateForm(data, allowEmpty = false) {
    for (const key in data) {
      if (data[key] || allowEmpty) {
        component.form.get(key).setValue(data[key]);
      }
    }
  }

  it('Should be valid', () => {
    const data = {
      username: 'john.doe',
      password: 'doe.john',
    };

    updateForm(data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(data);
  });

  it('Should be invalid due to missing required fields', () => {
    expect(component.form.valid).toBeFalsy();
    expect(component.username.errors['required']).toBeTruthy();
    expect(component.password.errors['required']).toBeTruthy();
  });

  it('Should be invalid due to short field values', () => {
    const data = {
      username: 'u',
      password: 'p',
    };

    updateForm(data);
    expect(component.form.valid).toBeFalsy();
    expect(component.username.errors['minlength']).toBeTruthy();
    expect(component.password.errors['minlength']).toBeTruthy();
  });

});
