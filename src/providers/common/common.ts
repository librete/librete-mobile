import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENV } from '@app/env';

@Injectable()
export class CommonProvider {
  private _env = ENV;
  private _accessToken: string;
  private _refreshToken: string;
  private _scope: string;

  constructor(public http: HttpClient) {
  }

  get isAuthenticated() {
     return this._accessToken ? true : false;
  }

  public setAuthenticationData(data) {
    this._accessToken = data.access_token;
    this._refreshToken = data.refresh_token;
    this._scope = data.scope;
  }

  public performRequest(relativeUrl: string,
    requestMethod: string,
    requestData?: object | HttpParams) {

    const url = `${this._env.apiUrl}/${relativeUrl}`;
    const data = JSON.stringify(requestData);
    const headers = this.getHeaders(requestMethod);
    const options = {
      headers: headers
    };

    switch (requestMethod) {
      case 'PUT': {
        return this.http.put(url, data, options);
      }
      case 'POST': {
        return this.http.post(url, data, options);
      }
      default: {  // GET
        const options = {
          params: <HttpParams>requestData,
          headers: headers
        };
        return this.http.get(url, options);
      }
    }
  }

  public toCamelCase(s) {
    return s.replace(/([\-_]\w)/g, function(m) {
      return m[1].toUpperCase();
    });
  }

  private getHeaders(requestMethod: string) {
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');

    if (this._accessToken) {
      headers = headers.append('Authorization', `Bearer ${this._accessToken}`);
    }

    return headers;
  }
}
