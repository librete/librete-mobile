import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { MyApp } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { ComponentsModule } from '../components/components.module';

import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SettingsPage } from '../pages/settings/settings';
import { EventListPage } from '../pages/event-list/event-list';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { EventCreatePage } from '../pages/event-create/event-create';
import { EventUpdatePage } from '../pages/event-update/event-update';
import { NoteListPage } from '../pages/note-list/note-list';
import { NoteDetailPage } from '../pages/note-detail/note-detail';
import { NoteCreatePage } from '../pages/note-create/note-create';
import { NoteUpdatePage } from '../pages/note-update/note-update';
import { TaskListPage } from '../pages/task-list/task-list';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { TaskCreatePage } from '../pages/task-create/task-create';
import { TaskUpdatePage } from '../pages/task-update/task-update';
import { CategoryListPage } from '../pages/category-list/category-list';
import { CategoryDetailPage } from '../pages/category-detail/category-detail';
import { CategoryCreatePage } from '../pages/category-create/category-create';
import { CategoryUpdatePage } from '../pages/category-update/category-update';

import { CommonProvider } from '../providers/common/common';
import { SettingsProvider } from '../providers/settings/settings';
import { AuthProvider } from '../providers/auth/auth';
import { EventsProvider } from '../providers/events/events';
import { NotesProvider } from '../providers/notes/notes';
import { TasksProvider } from '../providers/tasks/tasks';
import { CategoriesProvider } from '../providers/categories/categories';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    SignInPage,
    SettingsPage,
    EventListPage,
    EventDetailPage,
    EventCreatePage,
    EventUpdatePage,
    NoteListPage,
    NoteDetailPage,
    NoteCreatePage,
    NoteUpdatePage,
    TaskListPage,
    TaskDetailPage,
    TaskCreatePage,
    TaskUpdatePage,
    CategoryListPage,
    CategoryDetailPage,
    CategoryCreatePage,
    CategoryUpdatePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      },
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    SignInPage,
    SettingsPage,
    EventListPage,
    EventDetailPage,
    EventCreatePage,
    EventUpdatePage,
    NoteListPage,
    NoteDetailPage,
    NoteCreatePage,
    NoteUpdatePage,
    TaskListPage,
    TaskDetailPage,
    TaskCreatePage,
    TaskUpdatePage,
    CategoryListPage,
    CategoryDetailPage,
    CategoryCreatePage,
    CategoryUpdatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatePipe,
    CommonProvider,
    SettingsProvider,
    AuthProvider,
    EventsProvider,
    NotesProvider,
    TasksProvider,
    CategoriesProvider
  ]
})
export class AppModule {}
