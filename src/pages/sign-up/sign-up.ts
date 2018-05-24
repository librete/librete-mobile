import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';

import { CommonProvider } from '../../providers/common/common';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _commonProvider: CommonProvider,
    private _authProvider: AuthProvider
  ) {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  public get username() {
    return this.form.get('username');
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  public get firstName() {
    return this.form.get('firstName');
  }

  public get lastName() {
    return this.form.get('lastName');
  }

  public signUp() {
    this._authProvider.signUp(this.form.value).subscribe(
      data => {
        this._navCtrl.setRoot(SignInPage);
      },
      error => {
        for (let key in error.error) {
          key = this._commonProvider.toCamelCase(key);
          if (this.form.get(key)) {
            this.form.get(key).setErrors({
              remote: error.error[key]
            });
          }
        }
      }
    );
  }

}
