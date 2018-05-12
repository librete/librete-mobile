import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { ComponentsModule } from '../components/components.module';

import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { EventListPage } from '../pages/event-list/event-list';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { NoteListPage } from '../pages/note-list/note-list';
import { NoteDetailPage } from '../pages/note-detail/note-detail';
import { TaskListPage } from '../pages/task-list/task-list';
import { TaskDetailPage } from '../pages/task-detail/task-detail';

import { CommonProvider } from '../providers/common/common';
import { AuthProvider } from '../providers/auth/auth';
import { EventsProvider } from '../providers/events/events';
import { NotesProvider } from '../providers/notes/notes';
import { TasksProvider } from '../providers/tasks/tasks';
import { CategoriesProvider } from '../providers/categories/categories';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    SignInPage,
    EventListPage,
    EventDetailPage,
    NoteListPage,
    NoteDetailPage,
    TaskListPage,
    TaskDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    SignInPage,
    EventListPage,
    EventDetailPage,
    NoteListPage,
    NoteDetailPage,
    TaskListPage,
    TaskDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    AuthProvider,
    EventsProvider,
    NotesProvider,
    TasksProvider,
    CategoriesProvider
  ]
})
export class AppModule {}
