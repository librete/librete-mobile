import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { CommonProvider } from './../../providers/common/common';
import { AuthProvider } from './../../providers/auth/auth';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  public form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private commonProvider: CommonProvider,
    private authProvider: AuthProvider) {

    this.form = this.formBuilder.group({
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
    this.authProvider.signIn(username, password).subscribe(
      data => {
        this.commonProvider.setAuthenticationData(data);
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        for (const key in error.error) {
          if (this.form.get(key)) {
            this.form.get(key).setErrors({remote: error.error[key]});
          }
        }
      }
    );
  }

}
