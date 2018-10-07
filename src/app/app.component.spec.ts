import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule } from '@ngx-translate/core';

import { MyApp } from './app.component';
import { PlatformMock, SplashScreenMock, StatusBarMock } from '../../test-config/mocks-ionic';

import { Observable } from 'rxjs/Observable';

import { CommonProvider } from '../providers/common/common';
import { AuthProvider } from '../providers/auth/auth';
import { SignInPage } from '../pages/sign-in/sign-in';
import { HomePage } from '../pages/home/home';

class CommonProviderStub {
  isAuthenticated = true;
  readAuthenticationData() {
    return new Promise(resolve => { resolve(); });
  }
  setAuthenticationData() {
    return;
  }
}

class AuthProviderStub {
  succeed = true;
  refreshToken(): Observable<Object> {
    if (this.succeed) {
      return Observable.of({'token': 'Token value'});
    } else {
      return Observable.throw('');
    }
  }
}

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: AuthProvider, useClass: AuthProviderStub }
      ]
    });
  }));

  it('Should be created', () => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    expect(component instanceof MyApp).toBe(true);
  });

  it('Should return correct page list when authenticated', () => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    expect(component.pages.length).toBe(5);
  });

  it('Should return correct page list when unauthenticated', () => {
    const commonProvider = new CommonProviderStub();
    commonProvider.isAuthenticated = false;
    TestBed.overrideProvider(CommonProvider, { useValue: commonProvider });

    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;

    expect(component.pages.length).toBe(2);
  });

  it('Should set rootPage to HomePage when authenticated', (done) => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;

    component.determineAuthenticationStatus().then(
      data => {
        expect(component.rootPage).toBe(HomePage);
        done();
      }
    );
  });

  it('Should set rootPage to SignInPage when unauthenticated', (done) => {
    const authProvider = new AuthProviderStub();
    authProvider.succeed = false;
    TestBed.overrideProvider(AuthProvider, { useValue: authProvider });

    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;


    component.determineAuthenticationStatus().then(
      data => {
        expect(component.rootPage).toBe(SignInPage);
        done();
      }
    );
  });

  it('Should navigate to HomePage', () => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
    const spy = spyOn(component.nav, 'setRoot');

    component.openPage(HomePage);

    expect(spy).toHaveBeenCalledWith(HomePage);
  });

});
