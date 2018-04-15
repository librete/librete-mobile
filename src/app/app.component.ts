import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EventListPage } from '../pages/event-list/event-list';
import { NoteListPage } from '../pages/note-list/note-list';
import { TaskListPage } from '../pages/task-list/task-list';

import { IPage } from './../interfaces/page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;

  rootPage: any = HomePage;
  public pages: Array<IPage>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages = [
        { title: 'Home', component: HomePage, icon: 'md-home' },
        { title: 'Events', component: EventListPage, icon: 'md-calendar' },
        { title: 'Notes', component: NoteListPage, icon: 'md-clipboard' },
        { title: 'Tasks', component: TaskListPage, icon: 'md-checkbox-outline' },
      ];
      console.log(this.pages);

    });
  }

  public openPage(page) {
    this.nav.setRoot(page);
  }
}

