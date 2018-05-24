import { Injectable } from '@angular/core';

import { CommonProvider } from '../common/common';
import { ENV } from '@app/env';

@Injectable()
export class AuthProvider {
  private _env = ENV;

  constructor(private _commonProvider: CommonProvider) {
  }

  public signUp(data) {
    const request_data = {
      'username': data.username,
      'email': data.email,
      'password': data.password,
      'first_name': data.firstName,
      'last_name': data.lastName
    };
    return this._commonProvider.performRequest('users/', 'POST', request_data);
  }

  public signIn(username, password) {
    const data = {
      'grant_type': this._env.grantType,
      'client_id': this._env.clientID,
      'client_secret': this._env.clientSecret,
      'username': username,
      'password': password
    };
    return this._commonProvider.performRequest('oauth2/token/', 'POST', data);
  }

  public refreshToken() {
    const data = {
      'grant_type': 'refresh_token',
      'client_id': this._env.clientID,
      'client_secret': this._env.clientSecret,
      'refresh_token': this._commonProvider.refreshToken
    };
    return this._commonProvider.performRequest('oauth2/token/', 'POST', data);
  }

}
