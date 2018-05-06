import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { PlatformMock, SplashScreenMock, StatusBarMock } from '../../test-config/mocks-ionic';

import { Observable } from 'rxjs/Observable';

import { CommonProvider } from '../providers/common/common';
import { AuthProvider } from '../providers/auth/auth';

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
  refreshToken(): Observable<Object> {
    return Observable.of({'token': 'Token value'});
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

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it('Should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

});
