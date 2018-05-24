import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { CommonProvider } from '../../providers/common/common';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _commonProvider: CommonProvider,
    private _authProvider: AuthProvider
  ) {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public get username() {
    return this.form.get('username');
  }

  public get password() {
    return this.form.get('password');
  }

  public signIn() {
    const username: string = this.form.value.username;
    const password: string = this.form.value.password;
    this._authProvider.signIn(username, password).subscribe(
      data => {
        this._commonProvider.setAuthenticationData(data);
        this._navCtrl.setRoot(HomePage);
      },
      error => {
        for (const key in error.error) {
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
