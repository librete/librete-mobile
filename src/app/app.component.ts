import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { ENV } from '@app/env';

import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SettingsPage } from '../pages/settings/settings';
import { EventListPage } from '../pages/event-list/event-list';
import { NoteListPage } from '../pages/note-list/note-list';
import { TaskListPage } from '../pages/task-list/task-list';
import { CategoryListPage } from '../pages/category-list/category-list';

import { CommonProvider } from '../providers/common/common';
import { AuthProvider } from '../providers/auth/auth';

import { IPage } from '../interfaces/page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  public settingsPage = SettingsPage;
  private _env = ENV;

  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _translateService: TranslateService,
    private _commonProvider: CommonProvider,
    private _authProvider: AuthProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    _translateService.setDefaultLang(this._env.language);

    _commonProvider.readAuthenticationData().then(
      data => {
        this._authProvider.refreshToken().subscribe(
          data => {
            this._commonProvider.setAuthenticationData(data);
            this.rootPage = this._commonProvider.isAuthenticated ? HomePage : SignInPage;
          },
          error => {
            this.rootPage = SignInPage;
          }
        );
      }
    );
  }

  public get pages() {
    let pageList: Array<IPage>;
    if (this._commonProvider.isAuthenticated) {
      pageList = [
        { title: 'common.menu.home', component: HomePage, icon: 'md-home' },
        { title: 'common.menu.events', component: EventListPage, icon: 'md-calendar' },
        { title: 'common.menu.notes', component: NoteListPage, icon: 'md-clipboard' },
        { title: 'common.menu.tasks', component: TaskListPage, icon: 'md-checkbox-outline' },
        { title: 'common.menu.categories', component: CategoryListPage, icon: 'md-apps' },
      ];
    } else {
      pageList = [
        { title: 'common.menu.signIn', component: SignInPage, icon: 'md-person' },
        { title: 'common.menu.signUp', component: SignUpPage, icon: 'md-person-add' },
      ];
    }
    return pageList;
  }

  public openPage(page) {
    this.nav.setRoot(page);
  }

}
