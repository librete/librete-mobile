import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { SignUpPage } from './sign-up';

import { CommonProvider } from '../../providers/common/common';
import { AuthProvider } from '../../providers/auth/auth';

class NavControllerStub {}
class CommonProviderStub {}
class AuthProviderStub {}

let component: SignUpPage;
let fixture: ComponentFixture<SignUpPage>;

describe('Pages: SignUpPage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPage],
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
    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
  });

  function updateForm(username, password, email, firstName, lastName) {
    component.username.setValue(username);
    component.password.setValue(password);
    component.email.setValue(email);
    component.firstName.setValue(firstName);
    component.lastName.setValue(lastName);
  }

  it('Should be valid', () => {
    updateForm('john.doe', 'doe.john', 'john.doe@example.com', 'John', 'Doe');
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual({
      username: 'john.doe',
      password: 'doe.john',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe'
    });
  });

  it('Should be invalid due to missing required fields', () => {
    expect(component.form.valid).toBeFalsy();
    expect(component.username.errors['required']).toBeTruthy();
    expect(component.password.errors['required']).toBeTruthy();
    expect(component.email.errors['required']).toBeTruthy();
    expect(component.firstName.errors['required']).toBeTruthy();
    expect(component.lastName.errors['required']).toBeTruthy();
  });

  it('Should be invalid due to short or invalid field values', () => {
    updateForm('u', 'p', 'invalid_email', 'John', 'Doe');
    expect(component.form.valid).toBeFalsy();
    expect(component.username.errors['minlength']).toBeTruthy();
    expect(component.password.errors['minlength']).toBeTruthy();
    expect(component.email.errors['email']).toBeTruthy();
  });

});
