import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { EventListPage } from '../pages/event-list/event-list';
import { NoteListPage } from '../pages/note-list/note-list';
import { TaskListPage } from '../pages/task-list/task-list';

import { CommonProvider } from '../providers/common/common';

import { IPage } from './../interfaces/page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  rootPage: any = this.commonProvider.isAuthenticated ? HomePage : SignInPage;

  constructor(platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private commonProvider: CommonProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  get pages() {
    let pageList: Array<IPage>;
    if (this.commonProvider.isAuthenticated) {
      pageList = [
        { title: 'Home', component: HomePage, icon: 'md-home' },
        { title: 'Events', component: EventListPage, icon: 'md-calendar' },
        { title: 'Notes', component: NoteListPage, icon: 'md-clipboard' },
        { title: 'Tasks', component: TaskListPage, icon: 'md-checkbox-outline' },
      ];
    } else {
      pageList = [
        { title: 'Sign in', component: SignInPage, icon: 'md-person' },
        { title: 'Sign up', component: SignUpPage, icon: 'md-person-add' },
      ];
    }
    return pageList;
  }

  public openPage(page) {
    this.nav.setRoot(page);
  }
}

