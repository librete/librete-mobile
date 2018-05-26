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

  function updateForm(username, password) {
    component.username.setValue(username);
    component.password.setValue(password);
  }

  it('Should be valid', () => {
    updateForm('test_username', 'test_password');
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual({
      username: 'test_username',
      password: 'test_password'
    });
  });

  it('Should be invalid due to missing required fields', () => {
    expect(component.form.valid).toBeFalsy();
    expect(component.username.errors['required']).toBeTruthy();
    expect(component.password.errors['required']).toBeTruthy();
  });

  it('Should be invalid due to short field values', () => {
    updateForm('u', 'p');
    expect(component.form.valid).toBeFalsy();
    expect(component.username.errors['minlength']).toBeTruthy();
    expect(component.password.errors['minlength']).toBeTruthy();
  });

});
